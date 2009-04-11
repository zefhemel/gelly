package gelly;

import java.lang.reflect.Method;

import gelly.exception.NoSuchMethodException;

public class GLNativeObject extends GLObject {
	Object obj = null;
	
	public GLNativeObject(GLClass cls, Object obj) {
		super(cls);
		this.obj = obj;
	}

	@Override
	public GLMethod getMethod(String selector) {
		try {
			return super.getMethod(selector);
		} catch(NoSuchMethodException ex) {
			Class<Object> cls = (Class<Object>) obj.getClass();
			for(Method m : cls.getMethods()) {
				if(m.getParameterTypes().length == 0 && m.getName().equals(selector)) {
					return new GLNativeMethod(selector);
				} else if(m.getParameterTypes().length > 0 && selector.equals(m.getName() + ":")) {
					return new GLNativeMethod(selector);
				}
			}
			throw new NoSuchMethodException(selector);
		}
	}
	
	public Object getObj() {
		return obj;
	}
	
	public String toString() {
	    return obj.toString();
	}
}
