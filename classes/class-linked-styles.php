<?php
if(!class_exists('Linked_Styles')){
  class Linked_Styles {
    public function __construct() {
      if(!get_option('parents_styles')){
        add_option('parents_styles');
      }
      //var_dump(get_option('module_type'));

      error_log('ran');

      add_filter('fl_builder_render_css', array( $this, 'add_fake_styles' ), 10, 3);
      add_filter('fl_builder_register_settings_form', array( $this, 'add_settings' ), 1010, 2  );
      add_action('fl_builder_after_save_layout', function($post_id, $publish, $data){
        $post_type = get_post_type($post_id);
        if($post_type === 'fl-builder-template'){
          $title = get_the_title($post_id);
          foreach($data as $node){
            $n = $node->node;

            $type = get_option('module_type')[$title];
            
            $this->save_parents_styles($type, $n, $data, $title);
            
          }
        }
      },10,3);
      add_action( 'wp_enqueue_scripts', function() {
        if ( class_exists('FLBuilderModel') && FLBuilderModel::is_builder_active() ) {
          wp_enqueue_script(
            'link-styles-js',
            plugins_url( '/', dirname(__FILE__) ) . '/dist/linked-styles.js',
            array('fl-builder-min'),
            '1.00',
            true 
          );
          wp_localize_script( 'link-styles-js', 'WP', array('url'=>admin_url( 'admin-ajax.php' )) );
        }
      });

      add_action('wp_ajax_create_linked_parent', array($this, 'create_linked_parent'));


 

    }
    function add_fake_styles( $css , $nodes, $global_settings) {
      //
      //ob_start();
      $new_styles = '';
      foreach ( $nodes['modules'] as $module_object ) {
        $id = $module_object->node;
        $module = $module_object->settings;
        $name = strtolower($module_object->name);

        if($module->link_to_parent_styles == 'linked-styles') { 
          $style = get_option('parent_styles')[$name][$module->linked_parent];
          $new_styles .= str_replace('MODULE_ID', $id, $style);
        }

      }

      $css .= $new_styles;

      return $css;

    }


    function add_settings($form, $id) {
  
      $moduleName = ucwords($id);
      ob_start();?>
        background:blue;
      <?php
      $testCSS = ob_get_clean();
      $all_parents = get_option('parent_styles');
      $parents_list = array();
      if($all_parents[$id]){
        foreach($all_parents[$id] as $key=>$style){
          $parents_list[$key] = $key;
        }
      }
      
      $modules = FLBuilderModel::get_enabled_modules(); //* getting all active modules slug
      if(in_array($id, $modules) ){
        $main = $form['style']['sections']['colors'];
        unset($form['style']['sections']['colors']);
        $form['style']['sections']['link'] = array(
        'title'     => __('Gradient', 'uabb'),
        	'fields' => array(
					'link_to_parent_styles'        => array(
						'type'    => 'select',
						'label'   => __( 'Use Parent Styles', 'fl-builder' ),
						'default' => 'false',
						'options' => array(
              'custom-styles'   => __( 'Use Custom Styles', 'fl-builder' ),
							'linked-styles'   => __( 'Link to Parent', 'fl-builder' ),
						),
						'toggle'  => array(
              'linked-styles'   => array(
                'fields'  =>array('linked_parent')
              ),
							'custom-styles'   => array(
								'sections'	=> array(
									'text','colors','border','style'
								),
							),
						),
          ),
          'linked_parent'  => array(
            'type'    => 'select',
            'label'   => __( 'Choose Parent To Link Too', 'fl-builder' ),
            'options' => $parents_list,
          )
				),
        );
        $form['style']['sections']['colors'] = $main;

      }
      return $form;
    } 

    function save_parents_styles($type, $id, $data, $name){
      $module_type=$type;
       $parents_name = $name;
       
       $settings= $data;
       
       $module_css = return_module_css( $type, $id, $settings );

       $parent_css = str_replace($id, 'MODULE_ID', $module_css);

       $parent_styles = get_option('parent_styles');
       $parent_styles[$module_type][$name] = $parent_css;
       update_option('parent_styles',$parent_styles);
       $module_type = get_option('module_type');
       $module_type = array_merge( $module_type,  array($name=>$type) );

       update_option('module_type', $module_type); 

    }

    function create_linked_parent(){
      $settings = json_decode(str_replace('\\','',$_POST['settings']));
      $name = $_POST['name'];
      $type = $_POST['type'];
      $node = $_POST['node'];
      //var_dump($settings);
      $this->save_parents_styles($type, $node, $settings, $name);
      //var_dump(return_module_css( $type, $node, $settings ));

      die();
    }

  }
  new Linked_Styles();
}
/* 
WORKFLOW
create user template 
  - mark it as parent
add new module 
  - select to inherit parents styles 
  - and advanced tab stuff too 

marking as a linkedParent
  - save module settings to an array
    - get_option?
      - module name slugified is the key

linking child to parent
  - append to all modules settings form (see beaver notes)
  - need to filter modules css to be the parents
         * this filter gives access to css at the end dump all parent styles for each node * 
    - 	add_filter('fl_builder_render_css', array( $this, 'uabb_extended_setting_css' ), 10, 3);
	      function uabb_extended_setting_css( $css (all the css), $nodes:(all the rows cols and nodes), $global_settings(???)) {}


*/

function return_module_css($type, $id, $settings){
  $global_settings = FLBuilderModel::get_global_settings();
		$defaults        = FLBuilderModel::get_module_defaults( $type );
		$settings        = (object) array_merge( (array) $defaults, (array) $settings );
		$settings        = apply_filters( 'fl_builder_render_module_css_settings', $settings, $id, $type );

		// Module
		$class            = get_class( FLBuilderModel::$modules[ $type ] );
		$module           = new $class();
		$module->settings = FLBuilderSettingsCompat::filter_node_settings( 'module', $settings );
    
		// CSS
		ob_start();
		include $module->dir . 'includes/frontend.css.php';
		FLBuilderCSS::render();
		$css .= ob_get_clean();
    var_dump(apply_filters( 'fl_builder_render_module_css', $css, $module, $id ));
		return apply_filters( 'fl_builder_render_module_css', $css, $module, $id );
}