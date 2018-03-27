( function( blocks, components, i18n, element ) {
	var el = element.createElement;
	var children = blocks.source ? blocks.source.children : null;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var MediaUpload = wp.blocks.MediaUpload;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.blocks.InspectorControls.TextControl;

	blocks.registerBlockType( 'organic/profile-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
		title: i18n.__( 'Profile' ), // The title of our block.
		icon: 'businessman', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
		category: 'common', // The category of the block.
		attributes: { // Necessary for saving block content.
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			subtitle: {
				type: 'array',
				source: 'children',
				selector: 'h5',
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
			alignment: {
				type: 'string',
				default: 'center',
			},
			facebookURL: {
				type: 'url',
			},
			twitterURL: {
				type: 'url',
			},
			instagramURL: {
				type: 'url',
			},
			linkedURL: {
				type: 'url',
			},
			emailAddress: {
				type: 'string',
			}
		},

		edit: function( props ) {

			var focus = props.focus;
			var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
			var alignment = props.attributes.alignment;
			var attributes = props.attributes;
			var facebookURL = props.attributes.facebookURL;
			var twitterURL = props.attributes.twitterURL;
			var instagramURL = props.attributes.instagramURL;
			var linkedURL = props.attributes.linkedURL;
			var emailAddress = props.attributes.emailAddress;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			return [
				!! focus && el( // Display controls when the block is clicked on.
					blocks.BlockControls,
					{ key: 'controls' },
					el(
						blocks.AlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
						}
					),
					el( 'div', { className: 'components-toolbar' },
						el(
							blocks.MediaUpload,
							{
								onSelect: onSelectImage,
								type: 'image',
								render: function( obj ) {
									return el( components.Button, {
										className: 'components-icon-button components-toolbar__control',
										onClick: obj.open
										},
										el( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
											el( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
										)
									);
								}
							},
						)
					)
				),
				!! focus && el(
					blocks.InspectorControls,
					{ key: 'inspector' },
					el( 'div', { className: 'components-block-description' }, // A brief description of our block in the inspector.
						el( 'p', {}, i18n.__( 'Add links to your social media profiles.' ) ),
					),
					el( 'h2', {}, i18n.__( 'Social Media Links' ) ), // A title for our social media link options.
					el(
						TextControl,
						{
							type: 'url',
							label: i18n.__( 'Facebook URL' ),
							value: facebookURL,
							onChange: function( newFacebook ) {
								props.setAttributes( { facebookURL: newFacebook } );
							},
						}
					),
					el(
						TextControl,
						{
							type: 'url',
							label: i18n.__( 'Twitter URL' ),
							value: twitterURL,
							onChange: function( newTwitter ) {
								props.setAttributes( { twitterURL: newTwitter } );
							},
						}
					),
					el(
						TextControl,
						{
							type: 'url',
							label: i18n.__( 'Instagram URL' ),
							value: instagramURL,
							onChange: function( newInstagram ) {
								props.setAttributes( { instagramURL: newInstagram } );
							},
						}
					),
					el(
						TextControl,
						{
							type: 'url',
							label: i18n.__( 'LinkedIn URL' ),
							value: linkedURL,
							onChange: function( newLinkedIn ) {
								props.setAttributes( { linkedURL: newLinkedIn } );
							},
						}
					),
					el(
						TextControl,
						{
							type: 'url',
							label: i18n.__( 'Email Address' ),
							value: emailAddress,
							onChange: function( newEmail ) {
								props.setAttributes( { emailAddress: newEmail } );
							},
						}
					),
				),
				el( 'div', { className: props.className },
					el( 'div', {
						className: attributes.mediaID ? 'organic-profile-image image-active' : 'organic-profile-image image-inactive',
						style: attributes.mediaID ? { backgroundImage: 'url('+attributes.mediaURL+')' } : {}
					},
						el( blocks.MediaUpload, {
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
									className: attributes.mediaID ? 'image-button' : 'button button-large',
									onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
								);
							}
						} )
					),
					el( 'div', {
						className: 'organic-profile-content', style: { textAlign: alignment } },
						el( blocks.Editable, {
							tagName: 'h3',
							inline: false,
							placeholder: i18n.__( 'Profile Name' ),
							value: attributes.title,
							onChange: function( newTitle ) {
								props.setAttributes( { title: newTitle } );
							},
							focus: focusedEditable === 'title' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'title' } ) );
							},
						} ),
						el( blocks.Editable, {
							tagName: 'h5',
							inline: false,
							placeholder: i18n.__( 'Subtitle' ),
							value: attributes.subtitle,
							onChange: function( newSubtitle ) {
								props.setAttributes( { subtitle: newSubtitle } );
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
							onChange: function( newBio ) {
								props.setAttributes( { bio: newBio } );
							},
							focus: focusedEditable === 'bio' ? focus : null,
							onFocus: function( focus ) {
								props.setFocus( _.extend( {}, focus, { editable: 'bio' } ) );
							},
						} ),
						el( 'div', { className: 'organic-profile-social' },
							attributes.facebookURL &&
							el( 'a', {
									className: 'social-link',
									href: attributes.facebookURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-facebook', } ),
							),
							attributes.twitterURL &&
							el( 'a', {
									className: 'social-link',
									href: attributes.twitterURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-twitter', } ),
							),
							attributes.instagramURL &&
							el( 'a', {
									className: 'social-link',
									href: attributes.instagramURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-instagram', } ),
							),
							attributes.linkedURL &&
							el( 'a', {
									className: 'social-link',
									href: attributes.linkedURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-linkedin', } ),
							),
							attributes.emailAddress &&
							el( 'a', {
									className: 'social-link',
									href: 'mailto:' + attributes.emailAddress,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-envelope', } ),
							),
						),
					),
				)
			];
		},

		save: function( props ) {
			var attributes = props.attributes;
			var alignment = props.attributes.alignment;

			return (
				el( 'div', { className: props.className },
					attributes.mediaURL &&
					el( 'div', { className: 'organic-profile-image', style: { backgroundImage: 'url('+attributes.mediaURL+')' } },
						el( 'img', { src: attributes.mediaURL } ),
					),
					el( 'div', { className: 'organic-profile-content', style: { textAlign: attributes.alignment } },
						el( 'h3', {}, attributes.title ),
						attributes.subtitle && el( 'h5', {}, attributes.subtitle ),
						attributes.bio && el( 'p', {}, attributes.bio ),
						el( 'div', { className: 'organic-profile-social' },
							attributes.facebookURL &&
							el( 'a', {
									className: 'social-link',
									href: attributes.facebookURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-facebook', } ),
							),
							attributes.twitterURL &&
							el( 'a', {
									className: 'social-link',
									href: attributes.twitterURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-twitter', } ),
							),
							attributes.instagramURL &&
							el( 'a', {
									className: 'social-link',
									href: attributes.instagramURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-instagram', } ),
							),
							attributes.linkedURL &&
							el( 'a', {
									className: 'social-link',
									href: attributes.linkedURL,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-linkedin', } ),
							),
							attributes.emailAddress &&
							el( 'a', {
									className: 'social-link',
									href: 'mailto:' + attributes.emailAddress,
									target: '_blank',
								},
								el( 'i', { className: 'fa fa-envelope', } ),
							)
						)
					)
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.components,
	window.wp.i18n,
	window.wp.element,
);
