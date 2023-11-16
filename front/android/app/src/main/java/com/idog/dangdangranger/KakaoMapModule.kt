package com.idog.dangdangranger

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.media.MediaPlayer
import android.util.Log

class KakaoMapModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var mediaPlayer: MediaPlayer? = null

    @ReactMethod
    fun playSound() {
        mediaPlayer = MediaPlayer.create(getReactApplicationContext(), R.raw.sound)
        mediaPlayer?.start()
        Log.d("KakaoMapModule", "playSound")
    }

    @ReactMethod
    fun stopSound() {
        if (mediaPlayer?.isPlaying == true) {
            mediaPlayer?.stop()
        }
        mediaPlayer?.release()
        mediaPlayer = null
        Log.d("KakaoMapModule", "stopSound")
    }

    override fun getName(): String {
        return "KakaoMapModule"
    }

    @ReactMethod
    fun showHelloWorld() {
        println("Hello World!")
    }
}
