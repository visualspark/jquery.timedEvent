# TimedEvent

## Options and Attributes
By default the plugin will look for explicit options passed in via javascript instantiation. If nothing is passed then the plugin will look for on element declaration. Those available declarations are:

```data-emit-target=" " ```
target element to emit event from

```data-emit-event=" " ```
Custom event name that will be emmited at the end of a countdown

## Example usage

**Using default event being triggered from timer element**

```
<span class="countDownDefault"></span>
$('.countDownDefault').TimedEvent().on("cd.finish",function(){
   // make magic happen
});
```

**Listening for a custom event on the timer element**

 ```
 <span class="countDown" data-emit-event="my.refresh"></span>
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
$('#displayDefaultTarget').on("cd.finish",function(e){
    // make magic happen
});
```

## Roadmap
- Support for numerical string types eg: mm:ss
