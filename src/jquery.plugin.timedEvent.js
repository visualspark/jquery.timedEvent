;(function ( $ ) {
    var pluginName = "TimedEvent";

    var vstimer = function ( el, options ) {
        /*  To avoid scope issues, use 'base' instead of 'this'
             to reference this class from internal events and functions.
        */
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

            base.startCount = base.options.time;

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

            opts.time = opts.time - 1;

            remainingTime = (opts.time.toString().length == 1)? "0"+ opts.time : opts.time;
            base.$el.html("00:" + remainingTime);

            if( !opts.time ){

                base.$el.trigger( opts.emitEvent );

                if(base.$emitTarget) {
                    base.$emitTarget.trigger(opts.emitEvent);
                }
                base.options.time = base.startCount;
            }
        };

        base.init();
    };

    /**
     * Default options
     * @type {{emitEvent: string, emitTarget: boolean, time: number}}
     */
    vstimer.defaultOptions = {
        emitEvent: "cd.finish",
        emitTarget: false,
        time: 10
    };

    /**
     * Creates the plugin instance on
     * @param options
     * @returns {*}
     * @constructor
     */
    $.fn[pluginName] = function (  options ) {
        return this.each(function () {

            var $this = $(this)
            , options = options || {};

            // take preference for object, otherwise fallback to data attribute
            options.emitTarget = options.emitTarget || $this.data("emitTarget");


            options.emitEvent = options.emitEvent || $this.data("emitEvent");
            options.time = options.time || $this.data("emitTime");

            ( new vstimer(this,  options));
        });
    };

})( jQuery );