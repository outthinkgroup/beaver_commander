<?php
//html template for custom settings field:: notes editor
if(!class_exists('Add_Commander_Custom_Field')){
    class Add_Commander_Custom_Field
    {
        function __construct(){
            add_action('fl_builder_control_custom_field', array($this, 'custom_field'),1,4);
        }

        function custom_field( $name, $value, $field, $setting ){

            ob_start();
            ?>
            <div class="commander-field-wrapper">
              <input type="hidden" class="field-data-container" name="<?php echo $name; ?>" value='<?php echo str_replace(['\\','""'], '' ,json_encode($value));?>' />
              <ul class="commander-custom-fields">
              <?php if(!is_array($value)){?>
                <div class="pair">
                  <input type="text" class="field_name" id="field-1">
                <div>
                <?php 
              }else{ 
                $count = 0;
                foreach($value as $field){
                  ?>
                  <div class="pair">
                    <input type="text" class="field_name" name='<?php echo $field; ?>' value='<?php echo $field; ?>' id="field-1"/>
                  </div>
                <?php
                }
              }
              ?>
              </ul>  
              <button class="new-fields" >add</button>
            </div>
            <?php 
            ob_end_flush();
            
             
      }
    }
    new Add_Commander_Custom_Field();
}