---
description: Erweiterung von Prüflosen um Toleranzwerte bei WE-Prüfung
public: true
published: true
---
## Use Case
Ausgelesen werden **Klassifikationsmerkmale** für ein Material. Diese werden während der Ausführung des BAdI als Toleranzwerte in die jeweilige Ausgabestruktur eingefügt.

## Code
Stand 28.02.2025

```
TYPES: BEGIN OF zty_custom_table,
         ClfnObject               TYPE string,
         CharcInternal            TYPE c LENGTH 10,
         CharcValuePositionNumber TYPE c LENGTH 3,
         ClassType                TYPE c LENGTH 3,
         CharcToDecimalValue      TYPE f,
         Characteristic           TYPE string,
       END OF zty_custom_table.

TYPES: BEGIN OF zty_characteristic_key_table,
         CharacteristicId   TYPE string,
         CharacteristicText TYPE string,
       END OF zty_characteristic_key_table.

" Constants for table selection
DATA(lv_const_table_key) = 'MARA'.
DATA(lv_const_class_key) = '001'.

" Declare relevant internal tables to read from cds views
DATA: lt_clfnobjectcharcvalue TYPE i_clfnobjectcharcvalue,
      lt_clfncharacteristic   TYPE i_clfncharacteristic.

" Declare internal table with relevant columns
DATA: lt_classification      TYPE TABLE OF zty_custom_table,
      lt_characteristic_keys TYPE TABLE OF zty_characteristic_key_table.

" Read the relevant characteristics from input structure
LOOP AT it_qinsp_plan_charact ASSIGNING FIELD-SYMBOL(<fs_plan_char>).
    APPEND VALUE #( CharacteristicId = <fs_plan_char>-characteristicname ) TO lt_characteristic_keys.
ENDLOOP.

" Variables for the three classification values
DATA: lv_min_value    TYPE string,
      lv_max_value    TYPE string,
      lv_target_value TYPE string.

" Assign material
DATA(lv_material) = is_qinsp_lot-material.

" Loop through all characteristics that must be added to the target structure
LOOP AT lt_characteristic_keys ASSIGNING FIELD-SYMBOL(<fs_char_key>).
  DATA(lv_char_index) = sy-tabix.
  CLEAR: lt_classification, lv_min_value, lv_max_value, lv_target_value.

  TRY.
    " Select all entries from first table that match for MATNR
    SELECT ClfnObjectId, CharcInternalId, CharcValuePositionNumber, ClassType, CharcToDecimalValue
      FROM i_clfnobjectcharcvalue
      WITH PRIVILEGED ACCESS
      WHERE clfnobjectid = @lv_material
        AND clfnobjecttable = @lv_const_table_key
        AND classtype = @lv_const_class_key
      INTO TABLE @lt_classification.

    " Loop through internal table and append Characteristic of i_clfncharacteristic
    LOOP AT lt_classification ASSIGNING FIELD-SYMBOL(<fs_classification>).
      SELECT SINGLE Characteristic
        FROM i_clfncharacteristic
        WITH PRIVILEGED ACCESS
        WHERE CharcInternalId = @<fs_classification>-CharcInternal
        INTO @DATA(lv_characteristic).

      IF sy-subrc = 0.
        <fs_classification>-Characteristic = lv_characteristic.
      ENDIF.
    ENDLOOP.

    " Delete all entries that do not have the relevant char key
    DELETE lt_classification WHERE Characteristic <> <fs_char_key>-characteristicid.

    " Now sort the table by CharcValuePositionNumber ascending
    SORT lt_classification BY CharcValuePositionNumber ASCENDING.

    " Assign the first, second and third entry to new local variables, if they exist
    READ TABLE lt_classification INDEX 1 ASSIGNING FIELD-SYMBOL(<fs_min_value>).
    READ TABLE lt_classification INDEX 2 ASSIGNING FIELD-SYMBOL(<fs_max_value>).
    READ TABLE lt_classification INDEX 3 ASSIGNING FIELD-SYMBOL(<fs_target_value>).

    lv_min_value    = <fs_min_value>-charctodecimalvalue.
    lv_max_value    = <fs_max_value>-charctodecimalvalue.
    lv_target_value = <fs_target_value>-charctodecimalvalue.

    " Write values to target structure for the corresponding index
    READ TABLE ct_qinsp_plan_charact ASSIGNING FIELD-SYMBOL(<ls_qinsp_plan_charact>) INDEX lv_char_index.
    IF sy-subrc = 0.
      <ls_qinsp_plan_charact>-inspspeclowerlimit  = lv_min_value.
      <ls_qinsp_plan_charact>-inspspecupperlimit  = lv_max_value.
      <ls_qinsp_plan_charact>-inspspectargetvalue = lv_target_value.
    ELSE.
      RAISE EXCEPTION TYPE cx_sy_itab_line_not_found
        EXPORTING
          textid = cx_sy_itab_line_not_found=>cx_sy_itab_line_not_found.
    ENDIF.

  CATCH cx_root INTO DATA(lx_root).
    CONTINUE.
  ENDTRY.
ENDLOOP.
```