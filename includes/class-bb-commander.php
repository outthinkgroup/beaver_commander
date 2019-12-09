<?php
if(!class_exists('BB_Commander')){
  class BB_Commander {
    public function __construct() {
      
      $this->load_dependencies();
    }
    private function load_dependencies() {
      //require PLUGIN_DIR . 'classes/class-linked-styles.php';
      $this->enqueue_scripts();
      if( ( get_option('enabled_features')['shortcuts'] == true ) ){  
        $this->add_shortcuts();
      }
      if( ( get_option('enabled_features')['command_pallete'] == true ) ){  
        $this->add_command_pallete();
      }
    }
    private function enqueue_scripts(){

      add_action( 'wp_enqueue_scripts', function() {
        /* Check if Beaver Builder is active  */
        if ( class_exists('FLBuilderModel') && FLBuilderModel::is_builder_active() ) {
         
          wp_enqueue_script(
            'bb-commander-js', 
            plugins_url( '/', dirname(__FILE__) ) . '/dist/bb-commander.js',
            array('fl-builder-min'),
            '1.00',
            true 
          );
          wp_localize_script(
            'bb-commander-js',
            'COMMAND_SETTING',
            get_option('enabled_features')
          );
          wp_enqueue_style(
            'bb-commander-css',
            plugins_url( '/', dirname(__FILE__) ) . '/dist/bb-commander.css'
          );   
        }
      });
    }
    private function add_command_pallete() {
      /* adds the shortcut to beaverbuilders shortcut filter */
      add_filter( 'fl_builder_keyboard_shortcuts', function( $shortcuts ) {
        $shortcuts['openCommandPalette'] = array(
          'label' => __( 'opens the command palette', 'my-plugin'),
          'keyCode' => 'P'
        );
        return $shortcuts;
      });
    }
    private function add_shortcuts() {
      /* adds the shortcut to beaverbuilders shortcut filter */
      add_filter( 'fl_builder_keyboard_shortcuts', function( $shortcuts ) {
          $shortcuts['openColumnSettings'] = array(
            'label' => __( 'opens the column setting of the hovered module', 'my-plugin'),
            'keyCode' => 'c'
          );
          $shortcuts['openParentColumnSettings'] = array(
            'label' => __( 'opens the column setting of the hovered module', 'my-plugin'),
            'keyCode' => 'C'
          );
          $shortcuts['openModulesAdvancedTab'] = array(
            'label' => __( 'opens the settings of the hovered module and goes to advanced tab', 'my-plugin'),
            'keyCode' => 'a'
          );
          $shortcuts['openColAdvancedTab'] = array(
            'label' => __( 'opens the settings of the hovered Column and goes to advanced tab', 'my-plugin'),
            'keyCode' => 'A'
          );
          $shortcuts['deleteModule'] = array(
            'label' => __( 'deletes Module'),
            'keyCode' => 'mod+d'
          );
           $shortcuts['deleteColumn'] = array(
            'label' => __( 'deletes Column'),
            'keyCode' => 'D'
          );
           $shortcuts['copyModSettings'] = array(
            'label' => __( 'copies modules styles'),
            'keyCode' => 'mod+c'
          );
          $shortcuts['pasteModSettings'] = array(
            'label' => __( 'pastes modules styles'),
            'keyCode' => 'mod+v'
          );
          return $shortcuts;
      });
    }
  }
  new BB_Commander();
}