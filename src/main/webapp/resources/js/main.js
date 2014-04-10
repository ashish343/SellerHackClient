$(document).ready(function(){

	var handleResp = function(response) {
		console.log(response);
	}
	
	var getResults = function(query) {
		$.ajax("/search",{data:{q:query}, dataType:"json", success:handleResp});
	}

	$("#searchForm").submit(function() {
		var query = $("#query").val();	
		getResults(query);
	});

});