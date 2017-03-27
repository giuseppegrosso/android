package biz.aeffegroup.activitylifecycleexample;

import android.content.Intent;

import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() throws Exception {


        MainActivity activity = new MainActivity();

        activity.startActivity(new Intent());
        assertEquals(4, 2 + 2);
    }
}