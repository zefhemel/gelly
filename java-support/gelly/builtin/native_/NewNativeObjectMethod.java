package gelly.builtin.native_;

import gelly.GLMethod;
import gelly.GLNativeClass;
import gelly.GLNativeObject;
import gelly.GLObject;
import gelly.NativeUtils;

public class NewNativeObjectMethod extends GLMethod {
	public NewNativeObjectMethod(String selector) {
		super(selector, new String[] { "whatever" }, null);
	}

	@Override
	public GLObject invoke(GLObject self, GLObject[] args) {
		if(args.length == 0) {
			GLNativeClass cls = (GLNativeClass)self;
			try {
				Object o = cls.getWrappedClass().newInstance();
				return new GLNativeObject(cls, o);
			} catch (Exception e) {
				return null;
			}
		} else { // not implemented yet
			GLNativeClass cls = (GLNativeClass)self;
			Object[] javaArgs = new Object[args.length];
		    Class[] argTypes = new Class[args.length];
		    for(int i = 0; i < args.length; i++) {
		        javaArgs[i] = NativeUtils.gellyToJava(args[i]);
		        argTypes[i] = javaArgs[i].getClass();
		    }
			try {
				Object o = cls.getWrappedClass().getConstructor(argTypes).newInstance(javaArgs);
				return new GLNativeObject(cls, o);
			} catch (Exception e) {
				return null;
			}
		}
	}
}
