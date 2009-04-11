package gelly;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class GLNativeMethod extends GLMethod {

	public GLNativeMethod(String selector) {
		super(selector, new String[] { "args" }, null);
	}

	@Override
	public GLObject invoke(GLObject self, GLObject[] args) {
		try {
		    Object[] javaArgs = new Object[args.length];
		    Class[] argTypes = new Class[args.length];
		    for(int i = 0; i < args.length; i++) {
		        javaArgs[i] = NativeUtils.gellyToJava(args[i]);
		        argTypes[i] = javaArgs[i].getClass();
		    }
		    Object o = ((GLNativeObject)self).getObj();
		    String methodName = selector;
		    if(methodName.endsWith(":")) {
		        methodName = methodName.replace(":", "");
		    }
			Object result = o.getClass().getMethod(methodName, argTypes).invoke(o, javaArgs);
			return NativeUtils.javaToGelly(result);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
