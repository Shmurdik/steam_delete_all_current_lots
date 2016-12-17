$J('.market_listing_cancel_button a').each(function(i, el){
		var res = decodeURIComponent(String(el.href)).match(/mylisting', '(\d+)', (\d+), '(\d+)', '(\d+)'/i);
		if(res){
	new jQuery.post('//steamcommunity.com/market/removelisting/'+res[1], {sessionid: g_sessionID}).done(function(data){
				});
		}
	});