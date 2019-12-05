<?php
class CustomMarkup extends FLBuilderModule {
    public function __construct()
    {
        parent::__construct(array(
            'name'            => __( 'CUSTOM MARKUP', 'fl-builder' ),
            'description'     => __( 'A totally awesome module!', 'fl-builder' ),
            'group'           => __( 'My Group', 'fl-builder' ),
            'category'        => __( 'My Category', 'fl-builder' ),
            'dir'             => PLUGIN_DIR . 'custom-markup/',
            'url'             => PLUGIN_URL . 'custom-markup/',
            'icon'            => '',
            'editor_export'   => false, // Defaults to true and can be omitted.
            'enabled'         => true, // Defaults to true and can be omitted.
            'partial_refresh' => true, // Defaults to false and can be omitted.
        ));
    }

    function replace_with_fields($markup, $field, $field_val){
      return str_replace('{{'.$field.'}}', $field_val, $markup);
    }

    function replace_with_acf_fields($markup, $id){
      $fields = get_field_objects($id);
      foreach($fields as $field){
        $markup = str_replace('[['.$field['label'].']]', get_field($field['label']), $markup);
      }
      return $markup;
    }

}



FLBuilder::register_module( 'CustomMarkup', array(
    'items' => array(
		'title'    => __( 'Items', 'fl-builder' ),
		'sections' => array(
			'general' => array(
				'title'  => '',
				'fields' => array(
					'items' => array(
						'type'         => 'form',
						'label'        => 'Items',
						'form'         => 'item', // ID from registered form below
						'preview_text' => '', // Name of a field to use for the preview text
						'multiple'     => true,
					),
				),
			),
		),
	),
    'fields'      => array(
        'title'         => __( 'FIELDS', 'fl-builder' ),
        'sections'      => array(
            'mode'  => array(
                'title'            => __( 'MODE', 'fl-builder' ),
                'fields'    =>      array(
                    'isDev'         => array(
                    'type'          => 'select',
                    'label'         => __( 'Dev Mode', 'fl-builder' ),
                    'default'   => 'true',
                    'options'   =>  array(
                        'true'       =>  'ON',
                        'false'      =>  'OFF',
                    ),
                    'toggle'   =>   array(
                      'true'       => array(
                        'tabs'  =>  array('markup'),
                      ),
                    ),
                  ),
                ),
            ),
            'fields'  => array(
                'title'            => __( 'Fields', 'fl-builder' ),
                'fields'    =>      array(
                  'custom_field'  => array(
                    'type'  => 'custom_field'
                  )
                )
              ),
            )
          ),
    'markup' => array(
      'title'         => __( 'MARKUP', 'fl-builder' ),
      'sections'      => array(
        'general'  => array(
          'fields'    =>      array(   
            'markup'  => array(
              'type'          => 'code',
              'editor'        => 'html',
              'label'         => '',
              'rows'          => '18',
              'preview'           => array(
                'type'              => 'text',
                'selector'          => '.commander-html',
              ),
              'connections'         => array( 'html', 'string', 'url' ),
            ),  
          )
        )
      ) 
    )
            

) );


FLBuilder::register_settings_form('item', array(
    'title' => __('Items Fields', 'fl-builder'),
    'tabs'  => array(
        'general'      => array(
            'title'         => __('Set up', 'fl-builder'),
            'sections'      => array(
                'general'       => array(
                    'title'         => '',
                    'fields'        => array(
                        'item_data'         => array(
                            'type'          => 'custom_field_data',
                            'label'         => __('Insert Your Data', 'fl-builder')
                        )
                    )
                ),
            )
        )
    )
));


