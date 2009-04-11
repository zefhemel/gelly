package gelly.builtin.native_;

import java.lang.reflect.Constructor;

import gelly.GLMethod;
import gelly.GLNativeClass;

public class NewNativeClassMethod extends GLMethod {
	public NewNativeClassMethod() {
		super("new:", new String[] { "fullyQualifiedClassName" }, null);
	}

	@SuppressWarnings("unchecked")
	public gelly.GLObject invoke(gelly.GLObject o, gelly.GLObject[] args) {
		String fullyQualifiedClassName = ((gelly.GLString) args[((int) 0)])
				.getValue();
		GLNativeClass cls;
		try {
			Class<Object> wrappedClass = (Class<Object>) Class.forName(fullyQualifiedClassName);
			cls = new GLNativeClass(wrappedClass);
			boolean addedNoParamOption = false;
			boolean addedParamOption = false;
			for(Constructor cnstr : wrappedClass.getConstructors()) {
				if(cnstr.getParameterTypes().length == 0 && !addedNoParamOption) {
					cls.getMethods().put("new", new NewNativeObjectMethod("new"));
					addedNoParamOption = true;
				} else if(cnstr.getParameterTypes().length > 0 && !addedParamOption){
					cls.getMethods().put("new:", new NewNativeObjectMethod("new:"));
					addedParamOption = true;
				}
			}
			return cls;
		} catch (ClassNotFoundException e) {
			return null;
		}
	}

	public pil.reflect.Class getClassInfo() {
		return null;
		/*
		if (!pil.reflect.ClassCache.classCache
				.containsKey("gelly::builtin::native::NewNativeClassMethod")) {
			pil.reflect.ClassCache.classCache
					.put(
							"gelly::builtin::native::NewNativeClassMethod",
							new gelly.builtin.native_.reflect.NewNativeClassdMethodClassInfo());
		} else {
		}
		return pil.reflect.ClassCache.classCache
				.get("gelly::builtin::native::NewNativeClassMethod");*/
	}
}
