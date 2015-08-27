# TimedEvent
*version:1.1*

TimedEvent is a jQuery  plugin that displays a countdown timer then triggers a custom event once the timer reaches 0. This event can also be triggered on a remote object rather than the timer.

## Options and Attributes
By default the plugin will look for explicit options passed in via javascript instantiation. If nothing is passed then the plugin will look for on element declaration. Those available declarations are:

```
data-emit-target="#mySelector, .class .selector"
```
or
```
{
    emitTarget:"#mySelector, .class .selector"
}
```
target element to emit event from

```
data-emit-event="my.customEvent"
```
or
```
{
    emitEvent:"my.customEvent"
}
```
Custom event name that will be emmited at the end of a countdown
Default: "te.finish"

```
data-emit-time="30"
```
or
```
{
    emitTime:"my.customEvent"
}
```
The time period between events being triggered.
Default: 30seconds

Whether to loop the countdown recursively or not.
To set loop to true, you can use `data-loop=true`, `data-loop="true"` or just `data-loop`.
To set to false, do `data-loop=false`, `data-loop="false"` or just omit the `data-loop` attribute altogether.
Or use the object property on JS initialisation.
```
{
    loop: true
}
```
Default: false

## Example usage

**Using default event being triggered from timer element**

```
<span class="countDownDefault"></span>
$('.countDownDefault').TimedEvent().on("te.finish",function(){
   // make magic happen
});
```

**Listening for a custom event on the timer element and looping the timer recursively**

 ```
 <span class="countDown" data-emit-event="my.refresh" data-loop></span>
 $('.countDown').TimedEvent().on("kjc.priceRefresh",function(){
    // make magic happen
});
```

**Target a custom element to trigger the event from**

the timer, somewhere else on the page

```
<span class="countDownDefault" data-emit-target="#displayDefaultTarget"></span>
```

the target element listening for what ever event is triggered, somewhere on the page

```
<div id="displayDefaultTarget"></div>
```

```
$('#displayDefaultTarget').on("te.finish",function(e){
    // make magic happen
});
```

## Bugs

This plugin is only new so feedback and useful bug reports are extremely handy. A bug is a *demonstrable problem* that is caused by the code in the
repository. Good bug reports are extremely helpful!

## Roadmap
- Support for various numerical display types eg: mm:ss
- Pause timer event

## Suggestions
I am open to enhancements to the plugin so please send ideas or suggestions through.
