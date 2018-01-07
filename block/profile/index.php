<?php
/**
 * BLOCK: Profile
 *
 * Gutenberg Custom Profile Block assets.
 *
 * @since   1.0.0
 * @package OPB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'organic_profile_block_editor_assets' );

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: Includes block type registration and related functions.
 * `wp-element`: Includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function organic_profile_block_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'organic-profile-block', // Handle.
		plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // filemtime — Gets file modification time.
	);

	// Styles.
	wp_enqueue_style(
		'organic-profile-block-editor', // Handle.
		plugins_url( 'editor.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // filemtime — Gets file modification time.
	);
	wp_enqueue_style(
		'organic-profile-block-fontawesome', // Font Awesome for social media icons.
		plugins_url( 'font-awesome.css', __FILE__ )
	);
} // End function organic_profile_block_editor_assets().


// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'organic_profile_block_block_assets' );

/**
 * Enqueue the block's assets for the frontend.
 *
 * @since 1.0.0
 */
function organic_profile_block_block_assets() {
	// Styles.
	wp_enqueue_style(
		'organic-profile-block-frontend', // Handle.
		plugins_url( 'style.css', __FILE__ ), // Block frontend CSS.
		array( 'wp-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' ) // filemtime — Gets file modification time.
	);
	wp_enqueue_style(
		'organic-profile-block-fontawesome', // Font Awesome for social media icons.
		plugins_url( 'font-awesome.css', __FILE__ )
	);
} // End function organic_profile_block_block_assets().
