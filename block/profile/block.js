(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var RichText = editor.RichText
  var BlockControls = editor.BlockControls
  var AlignmentToolbar = editor.AlignmentToolbar
  var MediaUpload = editor.MediaUpload
  var InspectorControls = editor.InspectorControls
  var PanelBody = components.PanelBody
  var TextControl = components.TextControl

  registerBlockType('organic/profile-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Profile'), // The title of our block.
    description: __('A custom block for displaying personal profiles.'), // The description of our block.
    icon: 'businessman', // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'common', // The category of the block.
    supports: {
      align: true,
      alignWide: true
    },
    attributes: { // Necessary for saving block content.
      title: {
        type: 'array',
        source: 'children',
        selector: 'h3'
      },
      subtitle: {
        type: 'array',
        source: 'children',
        selector: 'h5'
      },
      bio: {
        type: 'string',
        source: 'html',
        selector: '.organic-profile-bio'
      },
      mediaID: {
        type: 'number'
      },
      mediaURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src'
      },
      alignment: {
        type: 'string',
        default: 'center'
      },
      facebookURL: {
        type: 'string'
      },
      twitterURL: {
        type: 'string'
      },
      instagramURL: {
        type: 'string'
      },
      linkedURL: {
        type: 'string'
      },
      emailAddress: {
        type: 'string'
      }
    },

    edit: function (props) {
      var attributes = props.attributes
      var alignment = props.attributes.alignment

      var onSelectImage = function (media) {
        return props.setAttributes({
          mediaURL: media.url,
          mediaID: media.id
        })
      }

      function onChangeAlignment (newAlignment) {
        props.setAttributes({ alignment: newAlignment })
      }

      return [
        el(BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
          el('div', { className: 'components-toolbar' },
            el(MediaUpload, {
              onSelect: onSelectImage,
              type: 'image',
              render: function (obj) {
                return el(components.Button, {
                  className: 'components-toolbar-button has-icon',
                  onClick: obj.open
                },
                // Add Dashicon for media upload button.
                el('svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
                  el('path', { d: 'M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z' })
                ))
              }
            })
          ),
          // Display alignment toolbar within block controls.
          el(AlignmentToolbar, {
            value: alignment,
            onChange: onChangeAlignment
          })
        ),
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody, {
            title: __('Social Media Links'),
            className: 'block-social-links',
            initialOpen: true
          },
          el('p', {}, __('Add links to your social media profiles.')),
          // Facebook social media text field option.
          el(TextControl, {
            label: __('Facebook URL'),
            value: attributes.facebookURL,
            onChange: function (newFacebook) {
              props.setAttributes({ facebookURL: newFacebook })
            }
          }),
          // Twitter social media text field option.
          el(TextControl, {
            label: __('Twitter URL'),
            value: attributes.twitterURL,
            onChange: function (newTwitter) {
              props.setAttributes({ twitterURL: newTwitter })
            }
          }),
          // Instagram social media text field option.
          el(TextControl, {
            label: __('Instagram URL'),
            value: attributes.instagramURL,
            onChange: function (newInstagram) {
              props.setAttributes({ instagramURL: newInstagram })
            }
          }),
          // LinkedIn social media text field option.
          el(TextControl, {
            label: __('LinkedIn URL'),
            value: attributes.linkedURL,
            onChange: function (newLinkedIn) {
              props.setAttributes({ linkedURL: newLinkedIn })
            }
          }),
          // Email address text field option.
          el(TextControl, {
            label: __('Email Address'),
            value: attributes.emailAddress,
            onChange: function (newEmail) {
              props.setAttributes({ emailAddress: newEmail })
            }
          }))
        ),
        el('div', { className: props.className },
          el('div', {
            className: attributes.mediaID ? 'organic-profile-image image-active' : 'organic-profile-image image-inactive',
            style: attributes.mediaID ? { backgroundImage: 'url(' + attributes.mediaURL + ')' } : {}
          },
          el(MediaUpload, {
            onSelect: onSelectImage,
            type: 'image',
            value: attributes.mediaID,
            render: function (obj) {
              return el(components.Button, {
                className: attributes.mediaID ? 'image-button' : 'button button-large',
                onClick: obj.open
              },
              !attributes.mediaID ? __('Upload Image') : el('img', { src: attributes.mediaURL })
              )
            }
          })
          ),
          el('div', { className: 'organic-profile-content', style: { textAlign: alignment } },
            attributes.title && el(RichText, {
              key: 'editable',
              tagName: 'h3',
              placeholder: 'Profile Name',
              keepPlaceholderOnFocus: true,
              value: attributes.title,
              onChange: function (newTitle) {
                props.setAttributes({ title: newTitle })
              }
            }),
            attributes.subtitle && el(RichText, {
              tagName: 'h5',
              placeholder: __('Subtitle'),
              keepPlaceholderOnFocus: true,
              value: attributes.subtitle,
              onChange: function (newSubtitle) {
                props.setAttributes({ subtitle: newSubtitle })
              }
            }),
            el(RichText, {
              className: 'organic-profile-bio',
              // key: 'editable',
              tagName: 'p',
              placeholder: __('Write a brief bio...'),
              keepPlaceholderOnFocus: true,
              value: attributes.bio,
              onChange: function (newBio) {
                props.setAttributes({ bio: newBio })
              }
            }),
            el('div', { className: 'organic-profile-social' },
              attributes.facebookURL && el('a', {
                className: 'social-link facebook-link',
                href: attributes.facebookURL,
                target: '_blank'
              },
              el('i', { className: 'fa fa-facebook' })
              ),
              attributes.twitterURL && el('a', {
                className: 'social-link twitter-link',
                href: attributes.twitterURL,
                target: '_blank'
              },
              el('i', { className: 'fa fa-twitter' })
              ),
              attributes.instagramURL && el('a', {
                className: 'social-link instagram-link',
                href: attributes.instagramURL,
                target: '_blank'
              },
              el('i', { className: 'fa fa-instagram' })
              ),
              attributes.linkedURL && el('a', {
                className: 'social-link linkedin-link',
                href: attributes.linkedURL,
                target: '_blank'
              },
              el('i', { className: 'fa fa-linkedin' })
              ),
              attributes.emailAddress && el('a', {
                className: 'social-link email-link',
                href: 'mailto:' + attributes.emailAddress,
                target: '_blank'
              },
              el('i', { className: 'fa fa-envelope' })
              )
            )
          )
        )
      ]
    },

    save: function (props) {
      var attributes = props.attributes
      var alignment = props.attributes.alignment
      var imageClass = 'wp-image-' + props.attributes.mediaID

      return (
        el('div', { className: props.className },
          attributes.mediaURL && el('div', { className: 'organic-profile-image', style: { backgroundImage: 'url(' + attributes.mediaURL + ')' } },
            el('figure', { class: imageClass },
              el('img', { src: attributes.mediaURL, alt: __('Profile Image') })
            )
          ),
          el('div', { className: 'organic-profile-content', style: { textAlign: alignment } },
            attributes.title && el(RichText.Content, {
              tagName: 'h3',
              value: attributes.title
            }),
            attributes.subtitle && el(RichText.Content, {
              tagName: 'h5',
              value: attributes.subtitle
            }),
            el(RichText.Content, {
              className: 'organic-profile-bio',
              tagName: 'p',
              value: attributes.bio
            }),
            el('div', { className: 'organic-profile-social' },
              attributes.facebookURL && el('a', {
                className: 'social-link facebook-link',
                href: attributes.facebookURL,
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              el('i', { className: 'fa fa-facebook' })
              ),
              attributes.twitterURL && el('a', {
                className: 'social-link twitter-link',
                href: attributes.twitterURL,
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              el('i', { className: 'fa fa-twitter' })
              ),
              attributes.instagramURL && el('a', {
                className: 'social-link instagram-link',
                href: attributes.instagramURL,
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              el('i', { className: 'fa fa-instagram' })
              ),
              attributes.linkedURL && el('a', {
                className: 'social-link linkedin-link',
                href: attributes.linkedURL,
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              el('i', { className: 'fa fa-linkedin' })
              ),
              attributes.emailAddress && el('a', {
                className: 'social-link email-link',
                href: 'mailto:' + attributes.emailAddress,
                target: '_blank',
                rel: 'noopener noreferrer'
              },
              el('i', { className: 'fa fa-envelope' })
              )
            )
          )
        )
      )
    }
  })
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)
