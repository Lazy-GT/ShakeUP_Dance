//package com.example.myapplication;
//
//import android.Manifest;
//import android.app.Activity;
//import android.content.Context;
//import android.content.Intent;
//import android.content.pm.PackageManager;
//import android.graphics.SurfaceTexture;
//import android.hardware.Camera;
//import android.hardware.camera2.CameraAccessException;
//import android.hardware.camera2.CameraCaptureSession;
//import android.hardware.camera2.CameraCharacteristics;
//import android.hardware.camera2.CameraDevice;
//import android.hardware.camera2.CameraManager;
//import android.hardware.camera2.CameraMetadata;
//import android.hardware.camera2.CaptureRequest;
//import android.hardware.camera2.params.StreamConfigurationMap;
//import android.media.CamcorderProfile;
//import android.media.MediaPlayer;
//import android.media.MediaRecorder;
//import android.net.Uri;
//import android.os.Bundle;
//import android.os.Environment;
//import android.util.Log;
//import android.util.Size;
//import android.view.Surface;
//import android.view.SurfaceHolder;
//import android.view.SurfaceView;
//import android.view.TextureView;
//import android.widget.Button;
//import android.widget.ImageButton;
//import android.widget.MediaController;
//import android.widget.Toast;
//import android.widget.VideoView;
//
//import androidx.annotation.NonNull;
//import androidx.appcompat.app.ActionBar;
//import androidx.appcompat.app.AppCompatActivity;
//import androidx.core.app.ActivityCompat;
//
//import java.io.File;
//import java.io.IOException;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.Date;
//import java.util.List;
//
//import com.google.android.gms.tasks.OnFailureListener;
//import com.google.android.gms.tasks.OnSuccessListener;
//import com.google.android.gms.tasks.Task;
//import com.google.firebase.database.DataSnapshot;
//import com.google.firebase.database.DatabaseError;
//import com.google.firebase.database.DatabaseReference;
//import com.google.firebase.database.FirebaseDatabase;
//import com.google.firebase.database.ValueEventListener;
//import com.google.firebase.storage.FirebaseStorage;
//import com.google.firebase.storage.StorageReference;
//import com.google.firebase.storage.UploadTask;
//import com.gun0912.tedpermission.PermissionListener;
//import com.gun0912.tedpermission.TedPermission;
//
//public class CameraActivity extends AppCompatActivity implements SurfaceHolder.Callback {
//
//    private static final String CAM_WHAT = "2";
//    static final String CAM_FRONT = "1";
//    private static final String CAM_REAR = "0";
//
//    private ImageButton btn_record;
//    private SurfaceView surfaceView;
//    private Camera camera;
////    private CameraManager mCameraManager;
//    private MediaRecorder mediaRecorder;
//    private SurfaceHolder surfaceHolder;
//    private boolean recording = false;
//    private String TAG = "MainActivity.java";
//    private TextureView mTextureView;
//    private String videoFileName; // 녹화 생성 파일 이름
//    private CameraDevice mCamera;
//    private Size mPreviewSize;
//    private CameraCaptureSession mCameraSession;
//    private CaptureRequest.Builder mCaptureRequestBuilder;
//
//    private static final int REQUEST_CAMERA_PERMISSION = 1234;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.camera_test);
//        ActionBar actionBar = getSupportActionBar();
//        actionBar.hide();   //타이틀바 숨기기
//
//        FirebaseStorage storage = FirebaseStorage.getInstance();
//        StorageReference storageRef = storage.getReference();
//
//        FirebaseDatabase database = FirebaseDatabase.getInstance();
//        DatabaseReference myRef = database.getReference("message");
//
//        System.out.println("파베_데이터 : " + myRef);
//        myRef.setValue("Hello, World!");
//
//        final MotiveVideoView videoView=(MotiveVideoView)findViewById(R.id.videoView);
//
//        //MainActivity 에서 비디오URL 값 가져오기
//        String videoUrl;
//        Intent intent = getIntent();
//        videoUrl = intent.getStringExtra("동영상링크");
//
//        System.out.println("주소값 : " + videoUrl);
//        //Video View에서 보여줄 동영상주소.
//        Uri url= Uri.parse(videoUrl);
//        videoView.setVideoURI(url);
//
//        //비디오 컨트롤바.
////        videoview.setMediaController(new MediaController(this));
//        //비디오 재생
////        videoview.start();
//
//        TedPermission.with(this) //권한을 얻기 위한 코드이다.
//                .setPermissionListener(permission)
//                .setRationaleMessage("녹화를 위하여 권한을 허용해주세요.")
//                .setDeniedMessage("권한이 거부되었습니다. 설정 > 권한에서 허용할 수 있습니다.")
//                .setPermissions(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.RECORD_AUDIO, Manifest.permission.READ_EXTERNAL_STORAGE)
//                .check();
//
//
//        // 카메라 권한 체크
//        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
//            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA_PERMISSION);
//            return;
//        }
//
//        btn_record = (ImageButton)findViewById(R.id.btn_record);
//        btn_record.setOnClickListener(v -> {
//            if (recording) { //녹화 중일 때 버튼을 누르면 녹화가 종료하도록 한다.
//                videoView.stopPlayback();
//                //종료 시(stop) 자동으로 저장도 완료가 된다.
//                mediaRecorder.stop();
//                mediaRecorder.release();
//
//                Toast.makeText(CameraActivity.this, videoFileName + "에 저장", Toast.LENGTH_SHORT).show();
//
//                //Firebase Upload
//                Uri file = Uri.fromFile(new File(videoFileName));
//                System.out.println("file : " + file);
//                //저장할 때 파일명 설정
//                StorageReference riversRef = storageRef.child("videos/" + file.getLastPathSegment());
//                System.out.println("file : " + riversRef);
//                // Register observers to listen for when the download is done or if it fails`
//                riversRef.putFile(file).addOnFailureListener(new OnFailureListener() {
//                    @Override
//                    public void onFailure(@NonNull Exception exception) {
//                        // Handle unsuccessful uploads
//                        System.out.println("실패 : " + exception.toString());
//                    }
//                }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
//                    @Override
//                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
//                        // taskSnapshot.getMetadata() contains file metadata such as size, content-type, etc.
//                        // ...
//                        System.out.println("성공 : " + taskSnapshot.toString());
//                    }
//                });
//                //로컬 저장소의 파일 삭제
////                deleteFile(videoFileName);
//
//                setResult(RESULT_OK);
//                finish();
//
//            } else { //녹화 중이 아닐 때 버튼을 누르면 녹화가 시작하게 한다.
//                videoView.start();
//                runOnUiThread(new Runnable() { //녹화를 하는 것은 백그라운드로 하는 것이 좋다.
//                    @Override
//                    public void run() {
////                        Toast.makeText(CameraActivity.this, "녹화가 시작되었습니다.", Toast.LENGTH_SHORT).show();
//                        try {
//                            mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
//                            mediaRecorder.setVideoSource(MediaRecorder.VideoSource.SURFACE);
//                            mediaRecorder.setProfile(CamcorderProfile.get(CamcorderProfile.QUALITY_HIGH));
//                            mediaRecorder.setOrientationHint(90);
//                            //파일의 외부 경로 확인
//                            //저장경로 : /storage/emulated/0/Android/data/com.example.myapplication/files
//                            String recordPath = getExternalFilesDir("/").getAbsolutePath();
//                            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
//                            videoFileName = recordPath + "/" +"Record_" + timeStamp + "_"+"video.mp4";
////                            System.out.println("저장경로 : " + videoFileName);
//                            mediaRecorder.setOutputFile(videoFileName);
//                            mediaRecorder.setPreviewDisplay(surfaceHolder.getSurface());
//                            mediaRecorder.prepare();
//                            mediaRecorder.start();
//                            recording = true;
//                            btn_record.setImageResource(R.drawable.stopxml);
////                            btn_record.setText("녹화 종료");
//                        } catch (IOException e) {
//                            Log.e(TAG, "Error in 79" + e.getMessage());
//                            e.printStackTrace();
//                            mediaRecorder.release();
//                        }
//                    }
//
//                });
//            }
//        });
//    }
//
//
//
//
//    PermissionListener permission = new PermissionListener() {
//        @Override
//        public void onPermissionGranted() { //권한을 허용받았을 때 camera와 surfaceView에 대한 설정을 해준다.
//            openCamera();
//            mTextureView = (TextureView) findViewById(R.id.texture);
////            Toast.makeText(CameraActivity.this, "권한 허가", Toast.LENGTH_SHORT).show();
//        }
//
//        @Override
//        public void onPermissionDenied(List<String> deniedPermissions) {
//
//        }
//
//        public void onPermissionDenied(ArrayList<String> deniedPermissions) { //권한이 거부됐을 때 이벤트를 설정할 수 있다.
//            Toast.makeText(CameraActivity.this, "권한 거부", Toast.LENGTH_SHORT).show();
//        }
//    };
//
//    @Override
//    public void surfaceCreated(@NonNull SurfaceHolder holder) {
//    }
//
//    private void refreshCamera(Camera camera) {
//        if (surfaceHolder.getSurface() == null) {
//            return;
//        }
//        try {
//            camera.stopPreview();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        setCamera(camera);
//    }
//
//    private void setCamera(Camera cam) {
//        camera = cam;
//    }
//
//    @Override
//    public void surfaceChanged(@NonNull SurfaceHolder holder, int format, int width, int height) {
//        refreshCamera(camera);
//    }
//
//    @Override
//    public void surfaceDestroyed(@NonNull SurfaceHolder holder) {
//
//    }
//
//    private void openCamera() {
//        CameraManager manager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
//        try {
//            String[] cameraIdArray = manager.getCameraIdList();
//            Log.e("cklee", "MMM cameraIds = " + Arrays.deepToString(cameraIdArray));
//
//            // test 로 1 번 camera 를 사용 [전면 카메라]
//            String oneCameraId = cameraIdArray[1];
//
//            CameraCharacteristics cameraCharacter = manager.getCameraCharacteristics(oneCameraId);
//            Log.e("cklee", "MMM camraCharacter = " + cameraCharacter);
//
//            StreamConfigurationMap map = cameraCharacter.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
//            Size[] sizesForStream = map.getOutputSizes(MotiveVideoView.class);
//            Log.e("cklee", "MMM sizesForStream = " + Arrays.deepToString(sizesForStream));
//
//            // 가장 큰 사이즈부터 들어있다
//            mPreviewSize = sizesForStream[0];
//
//            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
//                // TODO: Consider calling
//                //    ActivityCompat#requestPermissions
//                // here to request the missing permissions, and then overriding
//                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
//                //                                          int[] grantResults)
//                // to handle the case where the user grants the permission. See the documentation
//                // for ActivityCompat#requestPermissions for more details.
//                return;
//            }
//            manager.openCamera(oneCameraId, new CameraDevice.StateCallback() {
//                @Override
//                public void onOpened(@NonNull CameraDevice cameraDevice) {
//                    mCamera = cameraDevice;
//                    showCameraPreview();
//                }
//
//                @Override
//                public void onDisconnected(@NonNull CameraDevice cameraDevice) {
//                    mCamera.close();
//                }
//
//                @Override
//                public void onError(@NonNull CameraDevice cameraDevice, int errorCode) {
//                    Log.e("cklee", "MMM errorCode = " + errorCode);
//                    mCamera.close();
//                    mCamera = null;
//                }
//            }, null);
//        } catch (CameraAccessException e) {
//            Log.e("cklee", "MMM openCamera ", e);
//        }
//    }
//    private void showCameraPreview() {
//        try {
//            SurfaceTexture texture = mTextureView.getSurfaceTexture();
//            texture.setDefaultBufferSize(mPreviewSize.getWidth(), mPreviewSize.getHeight());
//            Surface textureViewSurface = new Surface(texture);
//
//            mCaptureRequestBuilder = mCamera.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW);
//            mCaptureRequestBuilder.addTarget(textureViewSurface);
//            mCaptureRequestBuilder.set(CaptureRequest.CONTROL_MODE, CameraMetadata.CONTROL_MODE_AUTO);
//
//            mCamera.createCaptureSession(Arrays.asList(textureViewSurface), new CameraCaptureSession.StateCallback() {
//                @Override
//                public void onConfigured(@NonNull CameraCaptureSession cameraCaptureSession) {
//                    mCameraSession = cameraCaptureSession;
//                    updatePreview();
//                }
//
//                @Override
//                public void onConfigureFailed(@NonNull CameraCaptureSession cameraCaptureSession) {
//                    Log.e("cklee", "MMM onConfigureFailed");
//                }
//            }, null);
//        } catch (CameraAccessException e) {
//            Log.e("cklee", "MMM showCameraPreview ", e);
//        }
//    }
//
//    private void updatePreview() {
//        try {
//            mCameraSession.setRepeatingRequest(mCaptureRequestBuilder.build(), null, null);
//        } catch (CameraAccessException e) {
//            Log.e("cklee", "MMM updatePreview", e);
//        }
//    }
//
//
//}
