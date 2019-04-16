package com.canvas;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.zmxv.RNSound.RNSoundPackage;
import io.sentry.RNSentryPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

import com.rnfs.RNFSPackage;
import com.zmxv.RNSound.RNSoundPackage;

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
      // No need to add RnnPackage and MainReactPackage
      return Arrays.<ReactPackage>asList(
        new RNGoogleSigninPackage(),
        new RNFSPackage(),
        new RNSoundPackage()
          // eg. new VectorIconsPackage()
          new ReactNativeDocumentPicker()
      );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }
}
