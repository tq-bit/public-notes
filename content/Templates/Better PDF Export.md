---
description: Template für das Obsidian Addon 'Better PDF Export'
tags:
  - template
  - pdf
---
## Header

```html
    <div style="margin:0 5vw;width:90vw;font-size:12px;display:flex;align-items:center;justify-content:space-between;background-color:#003164">
      <div style="text-align:left;">
        <span class="title">Title</span>
      </div>
      <div style="text-align: right;">
        <b style='color: red;'>Confidental document for internal usage only | (c) Author</b>
      </div>
    </div>
```

## Footer

```html
<div style="margin:0 5vw;width:90vw;font-size:12px;display:flex;align-items:center;justify-content:space-between;">
  <div>
      <span>Print date: </span><span class='date'></span> by Tobias Quante
  </div>

  <div style='text-align:right;'>
    Page <span class="pageNumber"></span> of <span class="totalPages"></span>
  </div>  
</div>
```