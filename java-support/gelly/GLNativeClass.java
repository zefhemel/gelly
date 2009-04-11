package gelly;

public class GLNativeClass extends GLClass {
	Class<Object> wrappedClass = null;
	
	public GLNativeClass(Class<Object> wrappedClass) {
		super(RootNamespace.rootNamespace.get("Object"), "GLNativeClass");
		this.wrappedClass = wrappedClass;
	}
	
	public Class<Object> getWrappedClass() {
		return wrappedClass;
	}
}
