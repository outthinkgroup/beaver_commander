<?php
//loads and enqueus the scripts
/* loads all the styles scripts and html for the custom settings input field: notes editor */
require_once('custom-fields/custom-fields.php') ;
require_once('custom-fields-data/custom-fields-data.php') ;

if(!class_exists('BB_Commander_Fields')){
    class BB_Commander_Fields
    {
        function __construct() {
            add_action('wp_enqueue_scripts', array($this, 'custom_field_scripts'));
        }

        function custom_field_scripts(){
            if ( class_exists( 'FLBuilderModel' ) && FLBuilderModel::is_builder_active() ) {

                //Custom Field
                wp_enqueue_style( 'custom-fields-css', plugins_url( '/', __FILE__ )  . 'custom-fields/css/custom-fields.css', array(), '' );
                wp_enqueue_script( 'custom-fields-js', plugins_url( '/', __FILE__ ) . 'custom-fields/js/custom-fields.js', array(), '1.0', true );
                wp_localize_script( 'custom-fields-js', 'FIELDS', array(
                    'ajax_url' => admin_url( 'admin-ajax.php' )));

                //Custom Field Data
                wp_enqueue_style( 'custom-fields-data-css', plugins_url( '/', __FILE__ )  . 'custom-fields-data/css/custom-field-data.css', array(), '' );
                wp_enqueue_script( 'custom-field-data-js', plugins_url( '/', __FILE__ ) . 'custom-fields-data/js/custom-field-data.js', array(), '1.0', true );
                wp_localize_script( 'custom-field-data-js', 'FIELDS', array(
                    'ajax_url' => admin_url( 'admin-ajax.php' )));


            }     
        }
    }
    new BB_Commander_Fields();
}
