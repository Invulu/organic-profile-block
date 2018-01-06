( function( blocks, i18n, element, _ ) {
	var el = element.createElement;
	var children = blocks.source.children;
	var attr = blocks.source.attr;
	var BlockControls = wp.blocks.BlockControls;
	var AlignmentToolbar = wp.blocks.AlignmentToolbar;
	var MediaUploadButton = wp.blocks.MediaUploadButton;
	var InspectorControls = wp.blocks.InspectorControls;
	var TextControl = wp.blocks.InspectorControls.TextControl;
	var SelectControl = wp.blocks.InspectorControls.SelectControl;

	function customIcon() {
		return (
			el( 'svg', { className: 'organic-icon', width: 20, height: 20, viewBox: '0 0 20 20' },
				el( 'path', { d: "M11 10.977q0 0.937-0.57 1.48t-1.516 0.543h-6.828q-0.945 0-1.516-0.543t-0.57-1.48q0-0.414 0.027-0.809t0.109-0.852 0.207-0.848 0.336-0.762 0.484-0.633 0.668-0.418 0.871-0.156q0.070 0 0.328 0.168t0.582 0.375 0.844 0.375 1.043 0.168 1.043-0.168 0.844-0.375 0.582-0.375 0.328-0.168q0.477 0 0.871 0.156t0.668 0.418 0.484 0.633 0.336 0.762 0.207 0.848 0.109 0.852 0.027 0.809zM8.5 4q0 1.242-0.879 2.121t-2.121 0.879-2.121-0.879-0.879-2.121 0.879-2.121 2.121-0.879 2.121 0.879 0.879 2.121z" } )
			)
		)
	}

	blocks.registerBlockType( 'organic/profile-block', {
		title: i18n.__( 'Profile' ),
		// icon: customIcon,
		icon: 'businessman',
		category: 'common',
		attributes: {
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
				type: 'string',
			},
			twitterURL: {
				type: 'string',
			},
			instagramURL: {
				type: 'string',
			},
			linkedURL: {
				type: 'string',
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
			var onSelectImage = ( media ) => {
				props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			var facebookURL = props.attributes.facebookURL;
			var twitterURL = props.attributes.twitterURL;
			var instagramURL = props.attributes.instagramURL;
			var linkedURL = props.attributes.linkedURL;
			var emailAddress = props.attributes.emailAddress;

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
					el( 'div', { className: 'components-toolbar' },
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
					)
				),
				!! focus && el(
					blocks.InspectorControls,
					{ key: 'inspector' },
					el( 'div', { className: 'components-block-description' },
						el( 'p', {}, i18n.__( 'Add links to your social media profiles.' ) ),
					),
					el( 'h2', {}, i18n.__( 'Social Media Links' ) ),
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
	window.wp.i18n,
	window.wp.element,
	window._,
);
