// ==UserScript==
// @name         Steam - Delete all current lots
// @namespace    Shmurdik
// @version      0.1
// @description  Steam - Delete all current lots
// @author       Shmurdik
// @match        http://steamcommunity.com/market/listings/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $J('#tabContentsMyListings').before('<a href="#" class="item_market_action_button item_market_action_button_edit nodisable"><span id="delete_all_lots" class="item_market_action_button_contents">Delete ALL lots</span></a>');

    $J("#delete_all_lots").click(function(){
        $J('.market_listing_cancel_button a').each(function(i, el){
            var res = decodeURIComponent(String(el.href)).match(/mylisting', '(\d+)', (\d+), '(\d+)', '(\d+)'/i);
            if(res){
                new jQuery.post('//steamcommunity.com/market/removelisting/'+res[1], {sessionid: g_sessionID}).done(function(data){
				});
            }
        });
    });
})();
