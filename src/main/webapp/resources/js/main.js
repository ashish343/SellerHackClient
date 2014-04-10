$(document).ready(function(){

	var getHTMLforOneRecord = function(record) {
		var threadID = record.str.content;
		var topic = record.arr.str[1];
		var heading = record.arr.str[2] || "Thread Heading";
		var body = record.arr.str[0];
		return "<a class='list-group-item' href='https://sellercentral.amazon.com/forums/thread.jspa?threadID="+threadID+"'><h5 class='list-group-item-heading'>"+topic+"</h4><h4 class='list-group-item-heading'>"+heading+"</h5><p class='list-group-item-text'>"+body+"</p></a>";
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

	var getHTMLforcaption = function(num, time) {
		return "<div id='searchCaption' class='alert alert-info alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>Showing <strong>"+num+" results</strong> in 178632 threads in <strong>"+time/1000+" seconds</strong></div>";
	}

	var handleResp = function(response) {
		console.log("Yo! The results are in the house!");
		console.log(response);
		var fullHTML = getHTMLforcaption(response.response.result.numFound, response.response.lst.int[1].content) + getHTML(response.response.result.doc);
		$("#results").html(fullHTML);
	}
	
	var getResults = function(query) {
		$.ajax("/hello",{data:{q:query}, dataType:"json", success:handleResp});
	}

	$("#searchForm").submit(function(e) {
		e.preventDefault();
		$("#results").html("<div class='spinner'></div>");
		var query = $("#query").val();	
		getResults(query);
	});

});