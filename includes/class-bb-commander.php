<?php
if(!class_exists('BB_Commander')){
  class BB_Commander {
    public function __construct() {
      $this->load_dependencies();
    }
    private function load_dependencies() {

      $this->enqueue_scripts();
      $this->add_shortcut();
    }
    private function enqueue_scripts(){

      add_action( 'wp_enqueue_scripts', function() {
        /* Check if Beaver Builder is active  */
        if ( class_exists('FLBuilderModel') && FLBuilderModel::is_builder_active() ) {
          /**
           * Enqueue your custom JavaScript file
           *
           * Be sure to use the appropriate url reference function for whether your 
           * code is contained in a custom plugin or theme.
           *
           * Include fl-builder-min as a dependency for your script to ensure
           * Beaver Builder as well as jQuery are available when your script runs.
          */
          wp_enqueue_script(
            'bb-commander-js', 
            plugins_url( '/', dirname(__FILE__) ) . '/dist/bb-commander.js',
            array('fl-builder-min'),
            '1.00',
            true 
          );
          wp_enqueue_style(
            'bb-commander-css',
            plugins_url( '/', dirname(__FILE__) ) . '/dist/bb-commander.css'
          );   
        }
      });
    }
    private function add_shortcut() {
      /* adds the shortcut to beaverbuilders shortcut filter */
      add_filter( 'fl_builder_keyboard_shortcuts', function( $shortcuts ) {
          $shortcuts['openCommandPalette'] = array(
            'label' => __( 'opens the command palette', 'my-plugin'),
            'keyCode' => 'P'
          );
          return $shortcuts;
      });
    }
  }
  new BB_Commander();
}