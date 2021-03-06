import java.util.List;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.util.List;
import java.net.URL;
import java.net.HttpURLConnection;

/**
 * @author couedrao on 27/11/2019.
 * @project gctrl
 */
class SDNCtrlAPI {
    //redirecting traffic from GFx (ip=srcip) to GI (ip=10.0.0.201). the traffic now goes to lb (ip=10.0.0.206)
    String redirect_traffic(String srcip) {
        String status = "OK";
        Main.logger(this.getClass().getSimpleName(), "olddestip = 10.0.0.201 ; newdestip = 10.0.0.206 ; srcip = "+srcip);
        //TODO - DONE
        try 
        {
            URL url = new URL("http://localhost:8080/stats/flowentry/add");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            String input = "{\"dpid\": 1,\"cookie\": 0,\"table_id\": 0,\"priority\": 1111,\"flags\": 1,\"match\":{\"nw_dst\": \"10.0.0.201\",\"nw_src\":"+srcip+",\"dl_type\": 2048},\"actions\":[{\"type\": \"SET_FIELD\",\"field\": \"ipv4_dst\",\"value\": \"10.0.0.206\"},{\"type\":\"OUTPUT\",\"port\":\"NORMAL\"}]}" ;
            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes());
            os.flush();
        } 
        catch (IOException e) 
        { 
            e.printStackTrace(); 
            status = "KO"; 
        }

        return status;
    }
    
    String virtualGI_pretends_GI() {
        String status = "OK";
        Main.logger(this.getClass().getSimpleName(), "messages from virtual GI pretend to come from GI");
        //TODO - DONE
        try 
        {
            URL url = new URL("http://localhost:8080/stats/flowentry/add");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            String input = "{\"dpid\": 1,\"cookie\": 0,\"table_id\": 0,\"priority\": 1111,\"flags\": 1,\"match\":{\"nw_src\": \"10.0.0.205\",\"nw_dst\":\"10.0.0.200\",\"dl_type\": 2048},\"actions\":[{\"type\": \"SET_FIELD\",\"field\": \"ipv4_src\",\"value\": \"10.0.0.201\"},{\"type\":\"OUTPUT\",\"port\":\"NORMAL\"}]}" ;
            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes());
            os.flush();
        } 
        catch (IOException e) 
        { 
            e.printStackTrace(); 
            status = "KO"; ; 
        }

        return status;
    }
    
       
/*
    String insert_a_loadbalancer(String oldgwip, String lbip, List<String> newgwsip) {
        String status = "OK";
        Main.logger(this.getClass().getSimpleName(), "oldgwip = " + oldgwip + "; lbip = " + lbip + "; newgwsip = " + newgwsip);
        //TODO

        return status;
    }

    String remove_less_important_traffic(String importantsrcip) {
        String status = "OK";
        Main.logger(this.getClass().getSimpleName(), "importantsrcip = " + importantsrcip);
        //TODO

        return status;
    }
*/

}
