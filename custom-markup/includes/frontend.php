<?php 
  
  $fields = $settings->custom_field; 
  $items = $settings->items;
  $post_id = get_the_id();
  $html = '';
  if(!is_array($fields)) return;
  foreach($items as $item){
    $markup = $settings->markup;
    foreach($item as $field => $value){
      if(in_array($field, $fields)){
        $markup = $module->replace_with_fields($markup, $field, $value);
        $markup = $module->replace_with_acf_fields($markup, $post_id);
      }
    }
    $html .= $markup;
    
    
  }


?>

<div class="commander-html">

	<?php echo $html ?>
  <?php 
  
  ?>
</div>
