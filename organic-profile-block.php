<?php
/**
 * Adds a profile block to the WordPress 5 Gutenberg block editor.
 *
 * @link https://organicthemes.com
 * @since 1.0.0
 * @package OPB
 *
 * @wordpress-plugin
 * Plugin Name: Organic Profile Block
 * Plugin URI: https://organicthemes.com/
 * Description: The Profile Block is created for the Gutenberg content editor. It displays a profile section with an image, name, subtitle, bio and personal social media links. It's perfect for author biographies, personal profiles, or staff pages.
 * Author: Organic Themes
 * Author URI: https://organicthemes.com/
 * Version: 1.5
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
	define( 'OPB_VERSION', '1.5' );
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
require_once OPB_DIR . '/block/profile/index.php';

/*
-------------------------------------------------------------------------------------------------------
	Admin Notice
-------------------------------------------------------------------------------------------------------
*/

/** Function organic_profile_block_admin_notice_sale */
function organic_profile_block_admin_notice_sale() {
	if ( ! PAnD::is_admin_notice_active( 'notice-organic-profile-block-sale-forever' ) ) {
		return;
	}
	?>

	<div data-dismissible="notice-organic-profile-block-sale-forever" class="notice updated is-dismissible">

		<p><?php printf( wp_kses_post( '<a href="%1$s" target="_blank">Upgrade The Profile Block</a> and receive <a href="%2$s" target="_blank">8 Additional Premium Blocks</a> for the Gutenberg editor!', 'organic-profile-block' ), 'https://organicthemes.com/block/profile-block/', 'https://organicthemes.com/blocks/' ); ?></p>
		<p><a class="button button-primary" href="https://organicthemes.com/blocks/" target="_blank"><?php esc_html_e( 'Get Blocks Bundle', 'organic-profile-block' ); ?></a></p>

	</div>

	<?php
}

add_action( 'admin_init', array( 'PAnD', 'init' ) );
add_action( 'admin_notices', 'organic_profile_block_admin_notice_sale', 10 );

require OPB_DIR . '/admin/persist-admin-notices-dismissal/persist-admin-notices-dismissal.php';
