package gelly;

public class NativeUtils {
    public static Object gellyToJava(GLObject o) {
        if(o instanceof GLString) {
            return ((GLString)o).getValue();
        }
        if(o instanceof GLInt) {
            return ((GLInt)o).getValue();
        }
        if(o instanceof GLNativeObject) {
            return ((GLNativeObject)o).getObj();
        }
        throw new RuntimeException("Could not convert this gelly object: " + o);
    }
    
    public static GLObject javaToGelly(Object o) {
        if(o instanceof String) {
            return new GLString((String)o);
        }
        if(o instanceof Integer) {
            return new GLInt((Integer)o);
        }
        return new GLNativeObject(new GLNativeClass((Class<Object>)o.getClass()), o);
    }
}