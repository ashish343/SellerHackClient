<%@ include file="/WEB-INF/jsp/include.jsp" %>

<html>
  <head>
	<title>Amazon Seller Services</title>
	<link type="text/css" href="${path}/resources/css/bootstrap.min.css" rel="stylesheet"/>
	<link type="text/css" href="${path}/resources/css/main.css" rel="stylesheet"/>
	<%@ include file="/WEB-INF/jsp/js/pageJS.jsp" %>
  </head>
  <body>
  	<div id="wrap">
	    <%@ include file="/WEB-INF/jsp/NavigationBar/navbar.jsp" %>
		<div class="container">
	    	<h1>Hello - Spring Application</h1>
	    	<p>Greetings, it is now <c:out value="${now}"/></p>
	    </div>
	    <div id="push"></div>
	</div>
	<%@ include file="/WEB-INF/jsp/footer/footer.jsp" %>
	<%@ include file="/WEB-INF/jsp/js/loadJS.jsp" %>
  </body>
</html>
