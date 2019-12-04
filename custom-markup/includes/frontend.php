<?php 
  
  $fields = $settings->custom_field; 
  $items = $settings->items;

  $html = '';
  if(!is_array($fields)) return;
  foreach($items as $item){
    $markup = $settings->markup;
    foreach($item as $field => $value){
      if(in_array($field, $fields)){
        $markup = $module->replace_with_fields($markup, $field, $value);
      }
    }
    $html .= $markup;
    
    
  }


?>

<div class="commander-html">

	<?php echo $html ?>
  
</div>
