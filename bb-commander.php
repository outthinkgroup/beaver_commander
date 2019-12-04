<?php

/**
 * 
 *
 * @link              outthinkgroup.com
 * @since             1.0.0
 * @package           bb_commander
 *
 * @wordpress-plugin
 * Plugin Name:       Beaver Builder Commander  
 * Plugin URI:        
 * Description:       Adds a command Palette to  
 * Version:           1.0.0
 * Author:            Outthink
 * Author URI:        outthinkgroup.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       bb_cmd
 * Domain Path:       /languages
 */

 define( 'PLUGIN_VERSION', '1.0.0' );
	define( 'PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
	define( 'PLUGIN_URL', plugins_url( '/', __FILE__ )  );

function bb_commander_setup(){

	if ( ! class_exists( 'FLBuilderLoader' ) ) {
		return null;
	}
	
  require PLUGIN_DIR.'includes/class-bb-commander.php';
}
add_action('plugins_loaded', 'bb_commander_setup',11,0);

function init_custom_modules() {
    if ( class_exists( 'FLBuilder' ) ) {
        require_once 'custom-markup/custom-markup.php';
        require_once 'fields/config.php';
    }
}
add_action( 'init', 'init_custom_modules' );