package com.positiveloop;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.rctaudiotoolkit.AudioPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;

import java.util.List;
import java.util.Arrays;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import com.reactnativecommunity.rctaudiotoolkit.AudioPackage;
import com.RNFetchBlob.RNFetchBlobPackage;

public class MainApplication extends NavigationApplication {

            @Override
    protected ReactGateway createReactGateway() {
                ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                                return "index";
                            }
        };
                return new ReactGateway(this, isDebug(), host);
            }

            @Override
    public boolean isDebug() {
                return BuildConfig.DEBUG;
            }

            protected List<ReactPackage> getPackages() {
                // Add additional packages you require here
                                return Arrays.<ReactPackage>asList(
                                    new AsyncStoragePackage(),
                                    new RNUUIDGeneratorPackage(),
                                    new AudioPackage(),
                                    new RNFetchBlobPackage()
                                );
            }

            @Override
    public List<ReactPackage> createAdditionalReactPackages() {
                return getPackages();
            }
        }