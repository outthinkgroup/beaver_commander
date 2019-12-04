<?php
if(!class_exists('Add_Commander_Custom_Field_Data')){
  class Add_Commander_Custom_Field_Data{

    function __construct(){
        add_action('fl_builder_control_custom_field_data', array($this, 'custom_field_data'),1,4);
    }


    function custom_field_data( $name, $value, $field, $setting ){


      ob_start();


      ?>
      <div class="commander-field-wrapper">
        <input type="hidden" class="field-data-container" name="<?php echo $name; ?>" value='<?php if($value !== '') echo json_encode($value);?>' />
        
        <ul class="custom-fields-data-wrapper">
            <!-- fields inserted with js -->
        </ul>  
        
      </div>
  <?php
      ob_end_flush();
    }


  }


  new Add_Commander_Custom_Field_Data();
}
