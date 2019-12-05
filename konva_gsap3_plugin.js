(function() {
	gsap.registerPlugin({
		name: "konva",
		
		init:function(target, values, tween) {
			
			let data = this
			this._target = target;
			this._layer = (values.autoDraw !== false) ? target.getLayer() : null;
			this._params = [];
			
			
			
			for (param in values) {
				value = values[param];
				param = param;
				
			

				if (value instanceof Array){

					// for array, for example "points"

					start_array = target.attrs[param];
					end_array = value;

					if (start_array.length != end_array.length){
						console.warn("Konva Tween: Incorrect array length");
						//return;
					}

					a = []
					for (var i=0;i<end_array.length;i++){
						startValue = start_array[i];


						if (typeof end_array[i] === "string"){
							endValue = String(end_array[i]).split("=");
							if (endValue.length == 1){
								endValue = endValue[0]
							}else{
								endValue = addbits(startValue + endValue[0] + endValue[1])
							}
						}else{
							endValue = end_array[i];
						}
						a.push(gsap.utils.interpolate(startValue, endValue))
					}
					this._params[param] = a;
				}else{
					if (typeof value === "object"){

						// for position:{}, scale:{} etc

						if (typeof data._target[param] === "function"){
							f = data._target[param]();
							this._params[param] = f;
							for (obj_param in value){
								p = obj_param;
								startValue = f[p];
								
								if (typeof value[obj_param] === "string"){
									
									endValue = String(value[obj_param]).split("=");
									if (endValue.length == 1){
										endValue = endValue[0]
									}else{
										endValue = addbits(startValue + endValue[0] + endValue[1])
									}
								}else{
									endValue = value[obj_param];
								}
								
								this._params[param][p] = gsap.utils.interpolate(startValue, endValue)
							}
						}
					}else{
						if (data._target.attrs[param] != undefined){
							startValue = (gsap.getProperty(target.attrs, param))
						}else{
							if (
								//Params that starts from 1 by default
								param == "scaleX" ||
								param == "scaleY" ||
								param == "opacity" 
								){
								startValue = 1;
							}else{
								startValue = 0;	
							}
						}
						
						if (typeof value === "string"){
							endValue = String(value).split("=");
							if (endValue.length == 1){
								endValue = endValue[0]
							}else{
								endValue = addbits(startValue + endValue[0] + endValue[1])
							}
						}else{
							endValue = value;
						}
						
						this._params[param] = gsap.utils.interpolate(startValue, endValue)
					}
				}
			}
			data.target = target; 
			
		}, 
		
		
		render: function(progress, data) {
			
			for (param in data._params) {
				param = param;
				value = data._params[param];
				
				if (value instanceof Array){
					result = [];
					for (i=0;i<value.length;i++){
						result.push(value[i](progress))
					}
				}else{
					if (typeof value === "object"){
						result = {};
						for (i in value){
							if (typeof value[i] === "function"){
								result[i] = value[i](progress)
							}
						}
						
					}else{
						result = value(progress)
					}
				}

				if (typeof data._target[param] === "function"){
					data._target[param](result)
				}else{
					data._target.attrs[param] = result
				}
			}
			
			data._layer.draw()
			
		}
		
	});
})();


function addbits(s){
    var total= 0, s= s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
    while(s.length){
        total+= parseFloat(s.shift());
    }
    return total;
}
