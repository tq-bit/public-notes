---
description: Erweiterung von Bestellformularen um das Feld EIKTO
public: true
published: true
---
## Use case
Auslesen des Feldes **EIKTO**, abgebildet durch Feld **supplieraccountnumber** in CDS View **I_SUPPLIERPURCHASINGORG**.

Hierbei handelt es sich um die eigene Kundennummer bei einem Lieferanten 
Getestet werden kann mit App **ME23N** (Bestellungen Verwalten, Erweitert)
## Code

```abap
DATA: lv_supplierid TYPE string,
      lv_companycode TYPE string.

DATA: ls_supplierpurchasingorg TYPE I_SUPPLIERPURCHASINGORG.

DATA(purdoc_extension_out) = purdoc_extension.

" Select single row from I_PurchaseOrderAPI01 with required fields
SELECT SINGLE supplier, companycode
  FROM I_PurchaseOrderAPI01
  WHERE purchaseorder = @PURCHASEORDER
  INTO @DATA(ls_purchaseorder).

IF sy-subrc = 0.
  " Assign values to variables
  lv_supplierid = ls_purchaseorder-supplier.
  lv_companycode = ls_purchaseorder-companycode.

  " Select single row from I_SUPPLIERPURCHASINGORG with required fields
  SELECT SINGLE supplieraccountnumber
    FROM I_SUPPLIERPURCHASINGORG
    WHERE supplier = @lv_supplierid
      AND purchasingorganization = @lv_companycode
    INTO @ls_supplierpurchasingorg-supplieraccountnumber.

  IF sy-subrc = 0.
    " Assign the relevant field to the output structure
    purdoc_extension_out-yy1_our_cust_id_pdh = ls_supplierpurchasingorg-supplieraccountnumber.
  ENDIF.
ENDIF.

purdoc_extension = purdoc_extension_out.
```