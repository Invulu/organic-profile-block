( function( blocks, i18n, element, _ ) {
	var el = element.createElement;
	var children = blocks.source.children;
	var attr = blocks.source.attr;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var MediaUploadButton = wp.blocks.MediaUploadButton;
	var InspectorControls = wp.blocks.InspectorControls;

	function customIcon() {
		return (
			el( 'svg', { className: 'organic-icon', width: 20, height: 20, viewBox: '0 0 20 20' },
				el( 'path', { d: "M11 10.977q0 0.937-0.57 1.48t-1.516 0.543h-6.828q-0.945 0-1.516-0.543t-0.57-1.48q0-0.414 0.027-0.809t0.109-0.852 0.207-0.848 0.336-0.762 0.484-0.633 0.668-0.418 0.871-0.156q0.070 0 0.328 0.168t0.582 0.375 0.844 0.375 1.043 0.168 1.043-0.168 0.844-0.375 0.582-0.375 0.328-0.168q0.477 0 0.871 0.156t0.668 0.418 0.484 0.633 0.336 0.762 0.207 0.848 0.109 0.852 0.027 0.809zM8.5 4q0 1.242-0.879 2.121t-2.121 0.879-2.121-0.879-0.879-2.121 0.879-2.121 2.121-0.879 2.121 0.879 0.879 2.121z" } )
			)
		)
	}

	blocks.registerBlockType( 'organic/profile-block', {
		title: i18n.__( 'Profile' ),
		icon: customIcon,
		category: 'common',
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2',
			},
			subtitle: {
				type: 'array',
				source: 'children',
				selector: 'h4',
			},
			bio: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			social: {
				type: 'array',
				source: 'children',
				selector: '.social-icons',
			},
		},
		edit: function( props ) {
			var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
			var alignment = props.attributes.alignment;
			var focus = props.focus;
			var attributes = props.attributes;
			var onSelectImage = ( media ) => {
				props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			return [
				!! focus && el(
					blocks.BlockControls,
					{ key: 'controls' },
					el(
						blocks.AlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
						}
					),
					el(
						blocks.MediaUploadButton,
						{
							buttonProps: {
								className: 'components-icon-button components-toolbar__control',
								'aria-label': i18n.__( 'Edit image' ),
							},
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID,
						},
						el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
							el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
						)
					)
				),
				el( 'div', { className: props.className },
					el( 'div', {
						className: attributes.mediaID ? 'organic-profile-image image-active' : 'organic-profile-image image-inactive',
						style: attributes.mediaID ? { backgroundImage: 'url('+attributes.mediaURL+')' } : {}
					},
						el( blocks.MediaUploadButton, {
							buttonProps: {
								className: attributes.mediaID
									? 'image-button'
									: 'components-button button button-large',
							},
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID,
						},
							attributes.mediaID
								? el( 'img', { src: attributes.mediaURL } )
								: 'Upload Image'
						),
					),
					el( 'div', { className: 'organic-profile-content' },
						el( blocks.Editable, {
							tagName: 'h2',
							inline: true,
							placeholder: i18n.__( 'Profile Name' ),
							value: attributes.title,
							style: { textAlign: alignment },
							onChange: function( value ) {
								props.setAttributes( { title: value } );
							},
							focus: focusedEditable === 'title' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'title' } ) );
							},
						} ),
						el( blocks.Editable, {
							tagName: 'h4',
							inline: true,
							placeholder: i18n.__( 'Subtitle' ),
							value: attributes.subtitle,
							style: { textAlign: alignment },
							onChange: function( value ) {
								props.setAttributes( { subtitle: value } );
							},
							focus: focusedEditable === 'subtitle' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'subtitle' } ) );
							},
						} ),
						el( blocks.Editable, {
							tagName: 'p',
							inline: true,
							placeholder: i18n.__( 'Write a brief bio...' ),
							value: attributes.bio,
							style: { textAlign: alignment },
							onChange: function( value ) {
								props.setAttributes( { bio: value } );
							},
							focus: focusedEditable === 'bio' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'bio' } ) );
							},
						} ),
						el( blocks.Editable, {
							tagName: 'ul',
							multiline: 'li',
							placeholder: i18n.__( 'Paste a link to your social media profile...' ),
							value: attributes.social,
							onChange: function( value ) {
								props.setAttributes( { social: value } );
							},
							focus: focusedEditable === 'social' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'social' } ) );
							},
							//className: 'social-links',
						} ),
					),
				)
			];
		},
		save: function( props ) {
			var attributes = props.attributes;

			return (
				el( 'div', { className: props.className },
					attributes.mediaURL &&
					el( 'div', { className: 'organic-profile-image', style: { backgroundImage: 'url('+attributes.mediaURL+')' } },
						el( 'img', { src: attributes.mediaURL } ),
					),
					el( 'div', { className: 'organic-profile-content' },
						el( 'h2', {}, attributes.title ),
						el( 'h4', {}, attributes.subtitle ),
						el( 'p', { className: 'bio' }, attributes.bio ),
						el( 'ul', { className: 'social' }, attributes.social ),
					),
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element,
	window._,
);
