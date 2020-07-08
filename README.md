# Purpose

This is a sample application that writes a record to [Realm](https://realm.io/docs/javascript/latest/) on loading the App. It then reads the number of records in Realm and displays the count on screen.

The sample demonstrates a crash that happens when attempting to drive the application with [Detox](https://github.com/wix/Detox).

The application was created with `npx react-native init AwesomeProject`.

[Realm](https://realm.io/docs/javascript/latest/) was added following the [getting started guide](https://realm.io/docs/javascript/latest/).

[Detox](https://github.com/wix/Detox) was added following the [getting started guide](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md) and the [Jest setup guide](https://github.com/wix/Detox/blob/master/docs/Guide.Jest.md)

# Setup

- Install packages - `yarn install` or `npm install`
- Install pods - `cd ios && pod install && cd ..`

## Run the application

- `npx react-native run-ios`

## Run the tests

In a temrinal run

- `detox build --configuration ios`
- `detox test`

This will crash.

To see the [Detox](https://github.com/wix/Detox) tests pass comment out the following code in App.js, lines 34 - 41.

```javascript
Realm.open({
  schema: [{name: 'Dog', properties: {name: 'string'}}],
}).then((realm) => {
  realm.write(() => {
    realm.create('Dog', {name: 'Rex'});
  });
  setCurrentRealm(realm);
});
```

Re-run the detox build and test commands from above.

# Issue

Trying to run E2E tests using [Detox](https://github.com/wix/Detox) which causes a [Realm](https://realm.io/docs/javascript/latest/) write operation crashes the application with a native exception.

## Detox output

```
detox[23235] ERROR: Signal 11 was raised
(
  0   Detox                               0x0000000102bd1a07 __DTXHandleSignal + 59
  1   libsystem_platform.dylib            0x000000010712f5fd _sigtramp + 29
  2   ???                                 0x000000011d262000 0x0 + 4784005120
  3   AwesomeProject                      0x0000000101eab6e2 facebook::jsc::JSCRuntime::createFunctionFromHostFunction(facebook::jsi::PropNameID const&, unsigned int, std::__1::function<facebook::jsi::Value (facebook::jsi::Runtime&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long)>)::HostFunctionMetadata::initialize(OpaqueJSContext const*, OpaqueJSValue*) + 198
  4   DTXProfiler                         0x000000011efa4118 __dtx_initialize + 15
  5   JavaScriptCore                      0x00000001036cf45a JSC::JSCallbackObject<JSC::JSNonFinalObject>::init(JSC::JSGlobalObject*) + 250
  6   JavaScriptCore                      0x00000001036d6417 JSObjectMake + 215
  7   AwesomeProject                      0x0000000101f0644e realm::jsc::ObjectWrap<realm::js::RealmObjectClass<realm::jsc::Types> >::define_accessor_for_schema_property(OpaqueJSContext const*, OpaqueJSValue*&, realm::js::String<realm::jsc::Types>*) + 84
  8   AwesomeProject                      0x0000000101f05b1a realm::jsc::ObjectWrap<realm::js::RealmObjectClass<realm::jsc::Types> >::define_schema_properties(OpaqueJSContext const*, OpaqueJSValue*, realm::ObjectSchema const&, bool) + 156
  9   AwesomeProject                      0x0000000101f054c7 realm::jsc::ObjectWrap<realm::js::RealmObjectClass<realm::jsc::Types> >::create_instance_by_schema(OpaqueJSContext const*, OpaqueJSValue*&, realm::ObjectSchema const&, realm::js::RealmObject<realm::jsc::Types>*) + 2907
  10  AwesomeProject                      0x0000000101f047bf realm::js::RealmObjectClass<realm::jsc::Types>::create_instance(OpaqueJSContext const*, realm::js::RealmObject<realm::jsc::Types>) + 235
  11  AwesomeProject                      0x0000000101f1cecc realm::js::RealmClass<realm::jsc::Types>::create(OpaqueJSContext const*, OpaqueJSValue*, realm::js::Arguments<realm::jsc::Types>&, realm::js::ReturnValue<realm::jsc::Types>&) + 858
  12  AwesomeProject                      0x0000000101f17da6 OpaqueJSValue const* realm::js::wrap<&(realm::js::RealmClass<realm::jsc::Types>::create(OpaqueJSContext const*, OpaqueJSValue*, realm::js::Arguments<realm::jsc::Types>&, realm::js::ReturnValue<realm::jsc::Types>&))>(OpaqueJSContext const*, OpaqueJSValue*, OpaqueJSValue*, unsigned long, OpaqueJSValue const* const*, OpaqueJSValue const**) + 60
  13  JavaScriptCore                      0x00000001036c4ea8 long long JSC::APICallbackFunction::call<JSC::JSCallbackFunction>(JSC::JSGlobalObject*, JSC::CallFrame*) + 568
  14  ???                                 0x00002a5777001027 0x0 + 46555147014183
  15  JavaScriptCore                      0x000000010368974d llint_entry + 93344
  16  JavaScriptCore                      0x00000001036728ff vmEntryToJavaScript + 200
  17  JavaScriptCore                      0x0000000103aa96d5 JSC::Interpreter::executeCall(JSC::JSGlobalObject*, JSC::JSObject*, JSC::CallType, JSC::CallData const&, JSC::JSValue, JSC::ArgList const&) + 549
  18  JavaScriptCore                      0x0000000103ce398a JSC::profiledCall(JSC::JSGlobalObject*, JSC::ProfilingReason, JSC::JSValue, JSC::CallType, JSC::CallData const&, JSC::JSValue, JSC::ArgList const&) + 170
  19  JavaScriptCore                      0x00000001036da75c JSObjectCallAsFunction + 620
  20  DTXProfiler                         0x000000011efa11d0 __dtx_JSObjectCallAsFunction + 377
  21  AwesomeProject                      0x0000000101f1d89a realm::js::RealmClass<realm::jsc::Types>::write(OpaqueJSContext const*, OpaqueJSValue*, realm::js::Arguments<realm::jsc::Types>&, realm::js::ReturnValue<realm::jsc::Types>&) + 132
  22  AwesomeProject                      0x0000000101f17f4a OpaqueJSValue const* realm::js::wrap<&(realm::js::RealmClass<realm::jsc::Types>::write(OpaqueJSContext const*, OpaqueJSValue*, realm::js::Arguments<realm::jsc::Types>&, realm::js::ReturnValue<realm::jsc::Types>&))>(OpaqueJSContext const*, OpaqueJSValue*, OpaqueJSValue*, unsigned long, OpaqueJSValue const* const*, OpaqueJSValue const**) + 60
  23  JavaScriptCore                      0x00000001036c4ea8 long long JSC::APICallbackFunction::call<JSC::JSCallbackFunction>(JSC::JSGlobalObject*, JSC::CallFrame*) + 568
  24  ???                                 0x00002a5777001027 0x0 + 46555147014183
  25  JavaScriptCore                      0x000000010368974d llint_entry + 93344
  26  JavaScriptCore                      0x000000010368974d llint_entry + 93344
  27  JavaScriptCore                      0x000000010368974d llint_entry + 93344
  28  JavaScriptCore                      0x000000010368974d llint_entry + 93344
  29  JavaScriptCore                      0x00000001036896cd llint_entry + 93216
  30  JavaScriptCore                      0x00000001036896cd llint_entry + 93216
  31  ???                                 0x00002a57770077b7 0x0 + 46555147040695
  32  JavaScriptCore                      0x00000001036896cd llint_entry + 93216
  33  JavaScriptCore                      0x00000001036896cd llint_entry + 93216
  34  JavaScriptCore                      0x000000010368974d llint_entry + 93344
  35  JavaScriptCore                      0x00000001036896cd llint_entry + 93216
  36  ???                                 0x00002a57770077b7 0x0 + 46555147040695
  37  JavaScriptCore                      0x00000001036728ff vmEntryToJavaScript + 200
  38  JavaScriptCore                      0x0000000103aa96d5 JSC::Interpreter::executeCall(JSC::JSGlobalObject*, JSC::JSObject*, JSC::CallType, JSC::CallData const&, JSC::JSValue, JSC::ArgList const&) + 549
  39  JavaScriptCore                      0x0000000103ce384d JSC::call(JSC::JSGlobalObject*, JSC::JSValue, JSC::CallType, JSC::CallData const&, JSC::JSValue, JSC::ArgList const&) + 45
  40  JavaScriptCore                      0x0000000103d8d26c JSC::boundThisNoArgsFunctionCall(JSC::JSGlobalObject*, JSC::CallFrame*) + 732
  41  JavaScriptCore                      0x0000000103672a2a vmEntryToNative + 210
  42  JavaScriptCore                      0x0000000103aa9722 JSC::Interpreter::executeCall(JSC::JSGlobalObject*, JSC::JSObject*, JSC::CallType, JSC::CallData const&, JSC::JSValue, JSC::ArgList const&) + 626
  43  JavaScriptCore                      0x0000000103ce398a JSC::profiledCall(JSC::JSGlobalObject*, JSC::ProfilingReason, JSC::JSValue, JSC::CallType, JSC::CallData const&, JSC::JSValue, JSC::ArgList const&) + 170
  44  JavaScriptCore                      0x00000001036da75c JSObjectCallAsFunction + 620
  45  DTXProfiler                         0x000000011efa11d0 __dtx_JSObjectCallAsFunction + 377
  46  AwesomeProject                      0x0000000101ea9af2 facebook::jsc::JSCRuntime::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long) + 166
  47  AwesomeProject                      0x0000000101eb1f8a facebook::jsi::Value facebook::jsi::Function::call<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, facebook::jsi::Value>(facebook::jsi::Runtime&, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, facebook::jsi::Value&&) const + 242
  48  AwesomeProject                      0x0000000101eb1deb std::__1::__function::__func<facebook::react::JSIExecutor::callFunction(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, folly::dynamic const&)::$_4, std::__1::allocator<facebook::react::JSIExecutor::callFunction(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, folly::dynamic const&)::$_4>, void ()>::operator()() + 93
  49  AwesomeProject                      0x0000000101dd89e4 void std::__1::__invoke_void_return_wrapper<void>::__call<void (*&)(std::__1::function<void ()> const&, std::__1::function<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > ()>), std::__1::function<void ()> const&, std::__1::function<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > ()> >(void (*&)(std::__1::function<void ()> const&, std::__1::function<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > ()>), std::__1::function<void ()> const&, std::__1::function<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > ()>&&) + 56
  50  AwesomeProject                      0x0000000101eaff52 facebook::react::JSIExecutor::callFunction(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&, folly::dynamic const&) + 430
  51  AwesomeProject                      0x0000000101ea64ae std::__1::__function::__func<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__1::function<void (facebook::react::JSExecutor*)>)::$_7, std::__1::allocator<facebook::react::NativeToJsBridge::runOnExecutorQueue(std::__1::function<void (facebook::react::JSExecutor*)>)::$_7>, void ()>::operator()() + 48
  52  AwesomeProject                      0x0000000101df537c facebook::react::tryAndReturnError(std::__1::function<void ()> const&) + 25
  53  AwesomeProject                      0x0000000101e0266e facebook::react::RCTMessageThread::tryFunc(std::__1::function<void ()> const&) + 18
  54  Detox                               0x0000000102bb7c4b ____dtx_CFRunLoopPerformBlock_block_invoke + 20
  55  CoreFoundation                      0x0000000105360b5c __CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK__ + 12
  56  CoreFoundation                      0x0000000105360253 __CFRunLoopDoBlocks + 195
  57  CoreFoundation                      0x000000010535b01d __CFRunLoopRun + 957
  58  CoreFoundation                      0x000000010535a944 CFRunLoopRunSpecific + 404
  59  AwesomeProject                      0x0000000101dead86 +[RCTCxxBridge runRunLoop] + 276
  60  Detox                               0x0000000102bc4a7f swz_runRunLoopThread + 182
  61  DTXProfiler                         0x000000011efa104a swz_runRunLoopThread + 42
  62  Foundation                          0x00000001046d89eb __NSThread__start__ + 1047
  63  libsystem_pthread.dylib             0x0000000107145109 _pthread_start + 148
  64  libsystem_pthread.dylib             0x0000000107140b8b thread_start + 15
)
```

## Xcode Log

```
2020-07-08 23:01:24.748986+0100 AwesomeProject[25533:277294] [DetoxInstrumentsManager] DTXProfiler class was not found, loading Profiler framework manually
2020-07-08 23:01:24.896718+0100 AwesomeProject[25533:277294] [DetoxInstrumentsManager] Encrypted framework binary found at /Applications/Detox Instruments.app/Contents/SharedSupport/ProfilerFramework/DTXProfiler.framework/DTXProfiler
2020-07-08 23:01:24.998206+0100 AwesomeProject[25533:277294] [RemoteProfilingManager] Attempting to publish service of type “_detoxprofiling._tcp”
2020-07-08 23:01:25.003275+0100 AwesomeProject[25533:277294] libMobileGestalt MobileGestalt.c:3684: SCPreferencesLock: Permission denied
2020-07-08 23:01:25.021939+0100 AwesomeProject[25533:277294] Enabling accessibility for automation on Simulator.
2020-07-08 23:01:25.220283+0100 AwesomeProject[25533:277826] [] nw_socket_handle_socket_event [C1.1:1] Socket SO_ERROR [61: Connection refused]
2020-07-08 23:01:25.221276+0100 AwesomeProject[25533:277826] [] nw_socket_handle_socket_event [C1.2:1] Socket SO_ERROR [61: Connection refused]
2020-07-08 23:01:25.222011+0100 AwesomeProject[25533:277858] [] nw_connection_get_connected_socket [C1] Client called nw_connection_get_connected_socket on unconnected nw_connection
2020-07-08 23:01:25.222204+0100 AwesomeProject[25533:277858] TCP Conn 0x600001280600 Failed : error 0:61 [61]
2020-07-08 23:01:25.237753+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for RCTUIManagerQueue
2020-07-08 23:01:25.238802+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for JS timers
2020-07-08 23:01:25.239914+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for RN load
2020-07-08 23:01:25.240105+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for Animated display link
2020-07-08 23:01:25.257679+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for network queue: <OS_dispatch_queue_serial: com.apple.NSURLSession-work>
2020-07-08 23:01:25.262658+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Found modern class RCTCxxBridge, method runRunLoop
2020-07-08 23:01:25.326055+0100 AwesomeProject[25533:277861] [] nw_socket_handle_socket_event [C2.1:3] Socket SO_ERROR [61: Connection refused]
2020-07-08 23:01:25.326291+0100 AwesomeProject[25533:277861] [BoringSSL] nw_protocol_boringssl_handshake_negotiate_proceed(726) [0x7f8039b05050] handshake failed at state 0
2020-07-08 23:01:25.327440+0100 AwesomeProject[25533:277858] Connection 2: received failure notification
2020-07-08 23:01:25.327560+0100 AwesomeProject[25533:277858] Connection 2: failed to connect 1:61, reason -1
2020-07-08 23:01:25.327631+0100 AwesomeProject[25533:277858] Connection 2: encountered error(1:61)
2020-07-08 23:01:25.348321+0100 AwesomeProject[25533:277858] Task <D3238357-9491-46A1-9F7D-3008C3D589A5>.<1> HTTP load failed, 0/0 bytes (error code: -1004 [1:61])
flipper: FlipperClient::addPlugin Inspector
flipper: FlipperClient::addPlugin Preferences
flipper: FlipperClient::addPlugin React
flipper: FlipperClient::addPlugin Network
2020-07-08 23:01:25.619020+0100 AwesomeProject[25533:278346] [ReactNativeSupport] Adding idling resource for JS runloop
2020-07-08 23:01:25.642881+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for network queue: <OS_dispatch_queue_serial: com.apple.NSURLSession-work>
2020-07-08 23:01:25.645 [info][tid:main][RCTRootView.m:294] Running application AwesomeProject ({
    initialProps =     {
    };
    rootTag = 1;
})
2020-07-08 23:01:25.675398+0100 AwesomeProject[25533:277294] [DetoxManager] Web socket failed to connect with error: The operation couldn’t be completed. Connection refused
2020-07-08 23:01:25.679 [warn][tid:NSOperationQueue 0x7f803f40ba30 (QOS: UNSPECIFIED)][RCTModuleData.mm:290] RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks
2020-07-08 23:01:25.690022+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for queue: <OS_dispatch_queue_serial: com.facebook.react.DevLoadingViewQueue>
2020-07-08 23:01:25.692358+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for queue: <OS_dispatch_queue_serial: com.facebook.react.AccessibilityManagerQueue>
2020-07-08 23:01:25.693701+0100 AwesomeProject[25533:277294] [ReactNativeSupport] Adding idling resource for queue: <OS_dispatch_queue_serial: com.facebook.react.LogBoxQueue>
2020-07-08 23:01:25.742348+0100 AwesomeProject[25533:277294] [RemoteProfilingManager] Net service of type “_detoxprofiling._tcp.” published
2020-07-08 23:01:25.869382+0100 AwesomeProject[25533:278346] [ReactNativeSupport] Adding idling resource for queue: <OS_dispatch_queue_serial: com.facebook.react.SourceCodeQueue>
2020-07-08 23:01:25.883669+0100 AwesomeProject[25533:278346] [ReactNativeSupport] Adding idling resource for queue: <OS_dispatch_queue_serial: com.facebook.react.BlobModuleQueue>
2020-07-08 23:01:25.887519+0100 AwesomeProject[25533:277861] [ReactNativeSupport] Adding idling resource for queue: <OS_dispatch_queue_serial: com.facebook.react.NetworkingQueue>
2020-07-08 23:01:25.891172+0100 AwesomeProject[25533:278353] [] nw_socket_handle_socket_event [C7.1:1] Socket SO_ERROR [61: Connection refused]
2020-07-08 23:01:25.892507+0100 AwesomeProject[25533:278353] [] nw_socket_handle_socket_event [C7.2:1] Socket SO_ERROR [61: Connection refused]
2020-07-08 23:01:25.893171+0100 AwesomeProject[25533:277861] [] nw_connection_get_connected_socket [C7] Client called nw_connection_get_connected_socket on unconnected nw_connection
2020-07-08 23:01:25.893352+0100 AwesomeProject[25533:277861] TCP Conn 0x6000012a0840 Failed : error 0:61 [61]
2020-07-08 23:01:25.958 [info][tid:com.facebook.react.JavaScript] Running "AwesomeProject" with {"rootTag":1,"initialProps":{}}
2020-07-08 23:01:25.961851+0100 AwesomeProject[25533:278346] [WXJSTimerObservationIdlingResource] Ignoring timer: 2 failure reason: "duration==0"
2020-07-08 23:01:25.971947+0100 AwesomeProject[25533:278346] [ReactNativeSupport] Adding idling resource for queue: <OS_dispatch_queue_serial: com.facebook.react.KeyboardObserverQueue>
(lldb)
```

## Versions

- react-native v0.62.2
- realm v^6.0.2
- detox v^17.1.1
