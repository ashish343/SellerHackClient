package servlet;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringBufferInputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@WebServlet(
        name = "MyServlet", 
        urlPatterns = {"/search"}
    )
public class HelloServlet extends HttpServlet {
	
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
    	System.out.print("Incoming ajax request");
    	String targetURL = "http://asishsi-1.desktop.amazon.com:8983/solr/#/collection1/query";
    	String urlParameters = "q=" + URLEncoder.encode(req.getParameter("q"), "UTF-8");
    	URL url;
        HttpURLConnection connection = null;  
        StringBuffer response = null;
        try {
          //Create connection
          url = new URL(targetURL);
          connection = (HttpURLConnection)url.openConnection();
          connection.setRequestMethod("POST");
          connection.setRequestProperty("Content-Type", 
               "application/x-www-form-urlencoded");
    			
          connection.setRequestProperty("Content-Length", "" + 
                   Integer.toString(urlParameters.getBytes().length));
          connection.setRequestProperty("Content-Language", "en-US");  
    			
          connection.setUseCaches (false);
          connection.setDoInput(true);
          connection.setDoOutput(true);

          //Send request
          DataOutputStream wr = new DataOutputStream (
                      connection.getOutputStream ());
          wr.writeBytes (urlParameters);
          wr.flush ();
          wr.close ();

          //Get Response	
          InputStream is = connection.getInputStream();
          BufferedReader rd = new BufferedReader(new InputStreamReader(is));
          String line;
          response = new StringBuffer(); 
          while((line = rd.readLine()) != null) {
            response.append(line);
            response.append('\r');
          }
          rd.close();

        } catch (Exception e) {

          e.printStackTrace();

        } finally {

          if(connection != null) {
            connection.disconnect(); 
          }
        }
    	
    	
        ServletOutputStream out = resp.getOutputStream();
        if(response != null) {
        	JSONObject xmlJSONObj = XML.toJSONObject(response.toString());
        	out.write(xmlJSONObj.toString().getBytes());
        }
        out.flush();
        out.close();
    }
    
}