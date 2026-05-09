<?php
/**
 * Plugin Name: Wine Menu Laparelli
 * Description: Mostra il menu vini dal Wine Inventory Manager
 * Version: 1.0
 * Author: Alessandro Meucci
 */

// Sicurezza — impedisce accesso diretto al file
if (!defined('ABSPATH')) exit;

// Registra lo shortcode
add_shortcode('wine_menu', 'wine_menu_render');

function wine_menu_render() {

  // URL del tuo backend Railway
  $api_url = 'https://wine-inventory-production.up.railway.app';

  // Chiama l'API
  $response = wp_remote_get($api_url);

  // Controlla errori
  if (is_wp_error($response)) {
    return '<p>Impossibile caricare il menu vini.</p>';
  }

  // Decodifica il JSON
  $wines = json_decode(wp_remote_retrieve_body($response), true);

  // Costruisci l'HTML
  $html = '<div class="wine-menu">';
  $html .= '<h3>I Nostri Vini</h3>';
  $html .= '<table class="wine-table">';
  $html .= '<thead><tr>
    <th>Vino</th>
    <th>Cantina</th>
    <th>Annata</th>
    <th>Tipo</th>
    <th>Prezzo</th>
  </tr></thead>';
  $html .= '<tbody>';

  foreach ($wines as $wine) {
    // mostra solo i vini con scorte disponibili
    if ($wine['quantity'] > 0) {
      $html .= '<tr>';
      $html .= '<td>' . esc_html($wine['name']) . '</td>';
      $html .= '<td>' . esc_html($wine['cantina']) . '</td>';
      $html .= '<td>' . esc_html($wine['anno']) . '</td>';
      $html .= '<td>' . esc_html($wine['types']) . '</td>';
      $html .= '<td>€' . esc_html($wine['price']) . '</td>';
      $html .= '</tr>';
    }
  }

  $html .= '</tbody></table>';
  $html .= '</div>';

  return $html;
}

// Stili CSS per il widget
add_action('wp_head', 'wine_menu_styles');

function wine_menu_styles() {
  echo '
  <style>
    .wine-menu {
      font-family: inherit;
      margin: 2rem 0;
    }
    .wine-menu h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      color: #5c1a1a;
    }
    .wine-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    .wine-table th {
      text-align: left;
      padding: 8px 12px;
      border-bottom: 2px solid #e0d8d0;
      color: #8a7f72;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .wine-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #f0ebe4;
    }
    .wine-table tr:last-child td {
      border-bottom: none;
    }
    .wine-table tr:hover td {
      background: #f9f7f4;
    }
  </style>
  ';
}