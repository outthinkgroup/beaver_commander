<?php
if(!class_exists('BB_Commander_Options')){
  class BB_Commander_Options {
    public function __construct() {

      $this->add_options();
    }

    function add_options(){
      add_filter( 'fl_builder_admin_settings_nav_items', __CLASS__ . '::admin_settings_nav_items' );
			add_action( 'fl_builder_admin_settings_render_forms', __CLASS__ . '::admin_settings_render_form' );
    }
    static public function admin_settings_nav_items( $nav_items ) {
		$nav_items['commander'] = array(
			'title'    => __( 'COMMANDER', 'fl-builder' ),
			'show'     => true,
			'priority' => 800,
		);

		return $nav_items;
  }
  
  static public function admin_settings_render_form() {
    
    ///sets and stores the options of the what features to run
    $available_features = array(
      'command_pallete' => true,
      'custom_markup'   => true,
      'shortcuts'   => true,
    );
    update_option('enabled_features',  $available_features);
    
    if(!isset($_POST['command_pallete']) && isset($_POST['update'])){

      $available_features['command_pallete'] = false;
      update_option('enabled_features',  $available_features);
    }
    if(!isset($_POST['custom-markup']) && isset($_POST['update'])){
      $available_features['custom-markup'] = false;
      update_option('enabled_features',  $available_features);
    }
    if(!isset($_POST['shortcuts']) && isset($_POST['update'])){
      $available_features['shortcuts'] = false;
      update_option('enabled_features',  $available_features);
    }

  ?>
  <div id="fl-commander-form" class="fl-settings-form">

    <h3 class="fl-settings-form-header"><?php _e( 'Beaver Commander Settings', 'fl-builder' ); ?></h3>

    <form id="commander-form" action="/wp-admin/options-general.php?page=fl-builder-settings#commander" method="post">

      <div class="fl-settings-form-content">

        <h4><?php _e( 'Disable Features', 'fl-builder' ); ?></h4>
        <p><?php _e( 'Use this setting to enable or disable Features in Beaver Commander.', 'fl-builder' ); ?></p>
        <p>
        <label for="custom-markup">
          <input type="checkbox" id="custom markup" name="custom-markup" value="custom-markup" <?php if( get_option('enabled_features')['custom_markup'] ) : 
            echo 'checked'; 
            endif; ?>   >
          custom-markup
        </label>
        </p>

        <p>
        <label for="shortcuts">
          <input type="checkbox" id="shortcuts" name="shortcuts" value="shortcuts" <?php if( get_option('enabled_features')['shortcuts'] ) : 
            echo 'checked'; 
            endif; ?>  >
          shortcuts
        </label>
        </p>

        <p>
          <label for="command-pallete">
          <input type="checkbox" id="command-pallete" name="command_pallete" value="command-pallete" <?php if( get_option('enabled_features')['command_pallete'] ) : 
            echo 'checked';
            endif; ?>   >
          command-pallete
        </label>
        </p>


        <?php do_action( 'fl_builder_admin_settings_commander_form' ); ?>
      </div>
      <p class="submit">
        <input type="submit" name="update" class="button-primary" value="<?php esc_attr_e( 'Save Commander Settings', 'fl-builder' ); ?>" />
        <?php wp_nonce_field( 'commander', 'fl-commander-nonce' ); ?>
      </p>
    </form>
  </div>
  <?php

  }

  }
  new BB_Commander_Options();
}