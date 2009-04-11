package gelly.builtin.native_;

import gelly.GLMethod;
import gelly.GLNativeClass;
import gelly.GLNativeObject;
import gelly.GLObject;

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
			return null;
		}
	}
}
