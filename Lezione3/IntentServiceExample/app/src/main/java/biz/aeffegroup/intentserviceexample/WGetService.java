package biz.aeffegroup.intentserviceexample;

import android.app.Activity;
import android.app.IntentService;
import android.content.Intent;
import android.os.Environment;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * An {@link IntentService} subclass for handling asynchronous task requests in
 * a service on a separate handler thread.
 * <p>
 * helper methods.
 */
public class WGetService extends IntentService {

    private int result = Activity.RESULT_CANCELED;
    public static final String URL = "urlpath";
    public static final String FILENAME = "filename";
    public static final String FILEPATH = "filepath";
    public static final String RESULT = "result";
    public static final String NOTIFICATION = "biz.aeffegroup.intentserviceexample";
    public WGetService() {
        super("WGetService");
    }

    private String fileName = null;

    @Override
    protected void onHandleIntent(Intent intent) {
        String img_url = intent.getStringExtra(URL);
        fileName = intent.getStringExtra(FILENAME);


        try {
            URL url = new URL(img_url);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setDoOutput(true);
            urlConnection.connect();
            File SDCardRoot = Environment.getExternalStorageDirectory();
            File file = new File(SDCardRoot, fileName);
            FileOutputStream fileOutput = new FileOutputStream(file);
            InputStream inputStream = urlConnection.getInputStream();
            byte[] buffer = new byte[1024];
            int bufferLength = 0;
            while ((bufferLength = inputStream.read(buffer)) > 0) {
                fileOutput.write(buffer, 0, bufferLength);
            }
            fileOutput.close();

            publishResults(Activity.RESULT_OK);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private void publishResults(int result) {
        Intent intent = new Intent(NOTIFICATION);
        intent.putExtra(FILEPATH, Environment.getExternalStorageDirectory().getPath().toString() + "/" + fileName);
        intent.putExtra(RESULT, result);
        sendBroadcast(intent);
    }

}
