/*!
 * jQuery Timed Event
 * Copyright Stephen Macchia
 * Licensed under the MIT license
 */
/**
 * @title jQuery Timed Event
 * @Author Stephen Macchia
 * @version 1.0
 * @description TimedEvent is a jQuery  plugin that displays a countdown timer then triggers a custom event once the timer reaches 0
 */

;(function ( $ ) {
    var pluginName = "timedEvent";

    var vstimer = function ( el, options, funcName ) {

        var base = this;

        /**
         * @desciption jQuery version of the element
         * @type {*|HTMLElement}
         */
        base.$el = $(el);

        /**
         * @description html version of the element
         * @type {*}
         */
        base.el = el;

        /**
         * @description Initalisation function. Assigns the start countdown time and triggers
         */
        base.init = function () {

            base.options = $.extend({},
                vstimer.defaultOptions, options);

            base.startCount = base.options.emitTime;

            if(  typeof base.options.emitTarget === "string"){
                base.$emitTarget = $(base.options.emitTarget);
            }

            // start the ticker
            base.play();
        };

        base.pause = function() {
          console.log( "pause the timer" );
          clearInterval(base.interval);
        }

        base.play = function() {
          console.log( "play the timer" );
          base.interval =  setInterval(base._processInterval, 1000);
        }

        /**
         * @description interval
         * @private
         */
        base._processInterval = function(){
            var opts = base.options
                , remainingTime;

            opts.emitTime = opts.emitTime - 1;

            remainingTime = (opts.emitTime.toString().length == 1)? "0"+ opts.emitTime : opts.emitTime;

            var mins = Math.floor(remainingTime / 60)
              , secs = remainingTime - (mins * 60);

            mins = mins < 10 ? "0"+mins : mins;
            secs = secs < 10 ? "0"+secs : secs;

            base.$el.html(mins+":" + secs);

            if( !opts.emitTime ){

                base.$el.trigger( opts.emitEvent );

                if(base.$emitTarget) {
                    base.$emitTarget.trigger(opts.emitEvent);
                }
                base.options.emitTime = base.startCount;

              if( !opts.loop ) clearInterval( base.interval );
            }
        };

        if(!funcName) base.init();
    };

    /**
     * Default options
     * @type {{emitEvent: string, emitTarget: boolean, time: number, loop: boolean}}
     */
    vstimer.defaultOptions = {
        emitEvent: "te.finish",
        emitTarget: false,
        emitTime: 30,
        loop: false
    };

    /**
     * Creates the plugin instance on
     * @param _funcName (string/object) optional - The name of the function you wish to call. If object is passed instead, will use this as the 'options' object and default to 'init' function.
     * @param options (object) optional - Will use plugin defaults if none passed.
     * @returns {*}
     * @constructor
     */
    $.fn[pluginName] = function ( _funcName, options ) {

        var funcName;

        // if first arg is not a function name (string), assume it's a config object
        if(typeof _funcName === "object" )      options = _funcName;
        else if(typeof _funcName === "string" ) funcName = _funcName;

        // ensures 'options' is an object literal (and not an array either)
        options = (typeof options !== "object" || $.isArray(options) ) ? {} : options;

        return this.each(function () {

            var $this = $(this)
              , instance;

            if( !funcName ) {
              // take preference for object, otherwise fallback to data attribute
              options.emitTarget = options.emitTarget || $this.data("emitTarget");

              /**
               * To set loop to true, you can use `data-loop=true`, `data-loop="true"` or just `data-loop`.
               * To set to false, do `data-loop=false`, `data-loop="false"` or just omit the `data-loop` attribute altogether.
               */
              var loop = $this.data("loop");
              options.loop = options.loop || (loop === "" ? true : (loop || false));

              options.emitEvent = options.emitEvent || $this.data("emitEvent");
              options.emitTime = options.emitTime || $this.data("emitTime");

              instance = new vstimer(this,  options, funcName);
              $this.data("instance", instance);
            } else {
              instance = $this.data("instance");

              if(!instance) return;

              switch(funcName) {
                case "pause": instance.pause(); break;
                case "play": instance.play(); break;
              }
            }
        });
    };

})( jQuery );
