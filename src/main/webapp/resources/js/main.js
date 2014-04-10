$(document).ready(function(){

	var getHTMLforOneRecord = function(record) {
		var threadID = record.str.content;
		return "<a class='list-group-item' href='https://sellercentral.amazon.com/forums/thread.jspa?threadID="+threadID+"'>Thread ID: "+threadID+"</a>";
	}

	var getHTML = function(records) {
		var result = "<div class='list-group'>";
		result += "<p class='list-group-item active'>Search Results</p>";
		for(var i=0; i<records.length; i++) {
			result += getHTMLforOneRecord(records[i]);
		}
		result += "</div>";
		return result;
	}

	var handleResp = function(response) {
		console.log("Yo! The results are in the house!");
		console.log(response);
		$("#results").html(getHTML(response.response.result.doc));
	}
	
	var getResults = function(query) {
		$.ajax("/search",{data:{q:query}, dataType:"json", success:handleResp});
	}

	$("#searchForm").submit(function() {
		$("#results").html("<div class='spinner'></div>");
		var query = $("#query").val();	
		getResults(query);
	});

});