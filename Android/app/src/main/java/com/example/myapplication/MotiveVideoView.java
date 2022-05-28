package com.example.myapplication;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.VideoView;

public class MotiveVideoView extends VideoView {

    public MotiveVideoView(Context context) {
        super(context);
    }

    public MotiveVideoView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        setMeasuredDimension(widthMeasureSpec, heightMeasureSpec);
    }
}