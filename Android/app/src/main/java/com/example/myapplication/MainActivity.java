package com.example.myapplication;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContract;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.hardware.Camera;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;
import java.net.URLEncoder;

public class MainActivity extends AppCompatActivity {

    private  WebView mwv;//Mobile Web View
    public static Context mContext;
    public String videoUrl;
    private static final int RC_FILE_CHOOSE = 2833;
    private ValueCallback<Uri> mUploadMsg = null;
    private ActivityResultLauncher<Intent> resultLauncher;
    public String test = "테스트용";

    static final int REQUEST_VIDEO_CAPTURE = 1;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //하단바 숨기기
        getWindow().getDecorView().getWindowInsetsController().hide(WindowInsets.Type.navigationBars());

        setContentView(R.layout.activity_main);
//        setContentView(R.layout.camera_test);
        mContext = this.getApplicationContext();


        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();   //타이틀바 숨기기

        mwv = (WebView) findViewById(R.id.activity_main_webview);
        mwv.addJavascriptInterface(new WebAppInterface(this), "Android");
        WebSettings mws = mwv.getSettings();//Mobile Web Setting
        mws.setDomStorageEnabled(true);
        mws.setLoadWithOverviewMode(true);//컨텐츠가 웹뷰보다 클 경우 스크린 크기에 맞게 조정
        // Javascript 사용하기
        mws.setJavaScriptEnabled(true);
        // WebView 내장 줌 사용여부
        mws.setBuiltInZoomControls(true);
        // 화면에 맞게 WebView 사이즈를 정의
        mws.setLoadWithOverviewMode(true);
        // ViewPort meta tag를 활성화 여부
        mws.setUseWideViewPort(true);
        // 줌 컨트롤 사용 여부
//        mws.setDisplayZoomControls(false);
        // 사용자 제스처를 통한 줌 기능 활성화 여부
//        mws.setSupportZoom(false);
        // TextEncoding 이름 정의
        mws.setDefaultTextEncodingName("UTF-8");
        // 웹뷰에 동영상을 바로 실행시키기 위함.
        mws.setMediaPlaybackRequiresUserGesture(true);
        // 뷰 가속 - 가속하지 않으면 영상실행 안됨, 소리만 나온다
        mwv.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        mws.setSupportMultipleWindows(true);
        // Setting Local Storage
        mws.setDatabaseEnabled(true);
        mws.setDomStorageEnabled(true);
        mws.setAllowContentAccess(true);
        mws.setAllowFileAccess(true);
//        mws.setAllowFileAccessFromFileURLs(true);
//        mws.setAllowUniversalAccessFromFileURLs(true);
        mws.getAllowContentAccess();
        mws.getAllowFileAccess();
        mws.getAllowFileAccessFromFileURLs();
        mws.getAllowUniversalAccessFromFileURLs();
        mws.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        // 웹을 더 쾌적하게 돌리기 위한 세팅
        mwv.setWebChromeClient(new WebChromeClient());
        mwv.setWebViewClient(new WebViewClient());

        // 캐쉬 사용 방법을 정의
        mws.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        mwv.clearCache(true);
        getWindow().getDecorView().getWindowInsetsController().hide(WindowInsets.Type.navigationBars());
        mwv.loadUrl("http://i6d103.p.ssafy.io/");
        // ATTENTION: This was auto-generated to handle app links.
        Intent appLinkIntent = getIntent();
        String appLinkAction = appLinkIntent.getAction();
        Uri appLinkData = appLinkIntent.getData();
    }



    public class WebAppInterface {
        Context mContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mContext = c;
        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String url, String modelUrl, String vid) {
            //토스트 메시지 보여주기
//            Toast.makeText(mContext, modelUrl , Toast.LENGTH_LONG).show();
            //카메라 실행
            Intent intent = new Intent(MainActivity.this, CAMERA2_Activity.class);
            intent.putExtra("동영상링크",url);
            intent.putExtra("모델링크",modelUrl);
            intent.putExtra("비디오아이디",vid);
            startActivityResult.launch(intent);
        }

        ActivityResultLauncher<Intent> startActivityResult = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                new ActivityResultCallback<ActivityResult>() {
                    @Override
                    public void onActivityResult(ActivityResult result) {
                        if (result.getResultCode() == RESULT_OK) {
//                            Toast.makeText(mContext, "로딩 페이지 작동 성공", Toast.LENGTH_LONG).show();
                            mwv.loadUrl("http://i6d103.p.ssafy.io/danddaloading");
                            //http://121.159.4.37:3000/
                            System.out.println("이전에 실행됨 ");
                            
                        } else {
//                            Toast.makeText(mContext, "로딩 페이지 작동 실패", Toast.LENGTH_LONG).show();
                        }
                    }
                }
        );
    }



    //추가전에 뒤로가기 이벤트 호출시 홈으로 돌아갔으나, 이젠 일반적인 뒤로가기 기능 활성화
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (mwv.canGoBack()) {
                mwv.goBack();
                return false;
            }
        }
        return super.onKeyDown(keyCode, event);
    }


}