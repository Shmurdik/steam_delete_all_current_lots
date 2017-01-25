// ==UserScript==
// @name         Steam - Delete all current lots
// @namespace    https://github.com/Shmurdik/steam_delete_all_current_lots
// @homepage     https://github.com/Shmurdik/steam_delete_all_current_lots
// @version      1.0.0.0
// @description  Steam - Delete all current lots
// @author       Shmurdik
// @match        http://steamcommunity.com/market/listings/*/*
// @match        https://steamcommunity.com/market/listings/*/*
// @updateURL	 https://raw.githubusercontent.com/Shmurdik/steam_delete_all_current_lots/master/steam_delete_all_current_lots.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    $J('#tabContentsMyListings').before('<a href="#delete_all_lots" class="item_market_action_button item_market_action_button_edit nodisable"><span id="delete_all_lots" class="item_market_action_button_contents">Delete ALL lots</span></a>');

    $J("#delete_all_lots").click(function(){
        var deleted = 0;
        var total = $J('.market_listing_cancel_button a').length;
        if(total <= 0) { alert('Not found lots. Nothing to do.'); return false; }
        var modal = ShowBlockingWaitDialog( 'Executing...', 'Please wait until all requests finish. Ignore all the errors, let it finish.' );
        $J('.market_listing_cancel_button a').each(function(i, el){
            var res = decodeURIComponent(String(el.href)).match(/mylisting', '(\d+)', (\d+), '(\d+)', '(\d+)'/i);
            if(res){
                jQuery.post('//steamcommunity.com/market/removelisting/'+res[1],
                            {sessionid: g_sessionID}
                ).always(function(data){
                    deleted++;
                    modal.Dismiss();
                    if(deleted >= total)
                    {
                        if(confirm('All done! Reload the page?')) { location.reload(); }
                    }
                    else
                    {
                        modal = ShowBlockingWaitDialog( 'Executing...', 'Deleted <b>' + deleted + '</b> of ' + total + '.' );
                    }
				});
            }
        });
    });
})();
