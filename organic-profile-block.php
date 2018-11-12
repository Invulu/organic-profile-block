<?php
/**
 *
 * @link https://organicthemes.com
 * @since 1.0.0
 * @package OPB
 *
 * Plugin Name: Organic Profile Block
 * Plugin URI: https://organicthemes.com/
 * Description: The Profile Block is created for the Gutenberg content editor. It displays a profile section with an image, name, subtitle, bio and personal social media links. It's perfect for author biographies, personal profiles, or staff pages.
 * Author: Organic Themes
 * Author URI: https://organicthemes.com/
 * Version: 1.3
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Define global constants.
 *
 * @since 1.0.0
 */
// Plugin version.
if ( ! defined( 'OPB_VERSION' ) ) {
	define( 'OPB_VERSION', '1.3' );
}

if ( ! defined( 'OPB_NAME' ) ) {
	define( 'OPB_NAME', trim( dirname( plugin_basename( __FILE__ ) ), '/' ) );
}

if ( ! defined( 'OPB_DIR' ) ) {
	define( 'OPB_DIR', WP_PLUGIN_DIR . '/' . OPB_NAME );
}

if ( ! defined( 'OPB_URL' ) ) {
	define( 'OPB_URL', WP_PLUGIN_URL . '/' . OPB_NAME );
}

/**
 * BLOCK: Profile Block.
 */
require_once( OPB_DIR . '/block/profile/index.php' );
