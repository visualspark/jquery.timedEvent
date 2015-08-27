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

    var vstimer = function ( el, options ) {

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
            base.interval =  setInterval(base._processInterval, 1000);
        };

        /**
         * @description interval
         * @private
         */
        base._processInterval = function(){
            var opts = base.options
                , remainingTime;

            opts.emitTime = opts.emitTime - 1;

            remainingTime = (opts.emitTime.toString().length == 1)? "0"+ opts.emitTime : opts.emitTime;
            base.$el.html("00:" + remainingTime);

            if( !opts.emitTime ){

                base.$el.trigger( opts.emitEvent );

                if(base.$emitTarget) {
                    base.$emitTarget.trigger(opts.emitEvent);
                }
                base.options.emitTime = base.startCount;

              if( !opts.loop ) clearInterval( base.interval );
            }
        };

        base.init();
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
     * @param options
     * @returns {*}
     * @constructor
     */
    $.fn[pluginName] = function (  options ) {

        // ensures 'options' is an object literal (and not an array either)
        options = (typeof options !== "object" || $.isArray(options) ) ? {} : options;

        return this.each(function () {

            var $this = $(this);

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

            ( new vstimer(this,  options));
        });
    };

})( jQuery );
