---
description: Code snippets to extend Adobe Forms with custom logic and fields
public: true
published: true
---
## Read Supplier Customer number for own company

```abap
DATA: lt_purchaseorder TYPE TABLE OF I_PurchaseOrderAPI01.
DATA: lt_supplierpurchasingorg TYPE TABLE OF I_SUPPLIERPURCHASINGORG.

DATA: lv_supplierid TYPE string.
DATA: lv_companycode TYPE string.

DATA(purdoc_extension_out) = purdoc_extension.

SELECT *
  FROM I_PurchaseOrderAPI01
  WHERE purchaseorder = @PURCHASEORDER
  INTO TABLE @lt_purchaseorder
  UP TO 1 ROWS.

IF sy-subrc = 0.
*   Get the customer ID and purchase org from PO
    READ TABLE lt_purchaseorder INTO DATA(ls_purchaseorder) INDEX 1.
    lv_supplierid = ls_purchaseorder-supplier.
    lv_companycode = ls_purchaseorder-companycode.

*   Read supplier purch org entry with keys
*   - supplierid
*   - companycode
    SELECT *
        FROM I_SUPPLIERPURCHASINGORG
        WHERE Supplier = @lv_supplierid
        AND purchasingorganization = @lv_companycode
        INTO TABLE @lt_supplierpurchasingorg
        UP TO 1 ROWS.
    IF sy-subrc = 0.
*        Get the relevant field and assign to output
        READ TABLE lt_supplierpurchasingorg INTO DATA(ls_supplierpurchasingorg) INDEX 1.
        purdoc_extension_out-yy1_our_cust_id_pdh = ls_supplierpurchasingorg-supplieraccountnumber.
    ENDIF.
ENDIF.

purdoc_extension = purdoc_extension_out.
```