"use client";
import { Flex, theme, Tag, Form, Input, Tooltip, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";

const tagInputStyle = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

export default function TaskForm({
  onSubmit,
  onCancel,
  taskToEdit = null,
  loading = false,
}) {
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const [form] = Form.useForm();

  // Llenar el formulario si taskToEdit existe
  useEffect(() => {
    if (taskToEdit) {
      form.setFieldsValue({
        title: taskToEdit.title || '',
        content: taskToEdit.content || '',
      });
      setTags(Array.isArray(taskToEdit.tags) ? taskToEdit.tags : []);
    } else {
      form.resetFields();
      setTags([]);
    }
  }, [taskToEdit, form]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const handleFinish = async (formData) => {
    const { title, content } = formData;
    const taskData = { title, content, tags };
    
    try {
      await onSubmit(taskData);
      // Limpiar formulario después del envío exitoso
      form.resetFields();
      setTags([]);
    } catch (error) {
      // El error ya se maneja en el hook
      console.error('Error in form submission:', error);
    }
  };

  return (
    <div className="p-6">
      <Form
        form={form}
        name="task-form"
        onFinish={handleFinish}
        layout="vertical"
        className="space-y-6"
      >
        {/* Campo de título */}
        <Form.Item 
          name="title" 
          label={<span className="text-gray-700 font-semibold">Título de la tarea</span>}
          rules={[{ required: true, message: 'Por favor ingresa un título' }]}
        >
          <Input 
            placeholder="¿Qué necesitas hacer?" 
            className="rounded-lg border-gray-300 h-12 text-lg"
            style={{ borderRadius: '12px' }}
            disabled={loading}
          />
        </Form.Item>

        {/* Campo de descripción */}
        <Form.Item 
          name="content"
          label={<span className="text-gray-700 font-semibold">Descripción</span>}
        >
          <Input.TextArea 
            placeholder="Describe los detalles de tu tarea..." 
            rows={4}
            className="rounded-lg border-gray-300"
            style={{ borderRadius: '12px' }}
            disabled={loading}
          />
        </Form.Item>

        {/* Sección de tags */}
        <div className="space-y-3">
          <label className="text-gray-700 font-semibold">Etiquetas</label>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <Flex gap="4px 0" wrap>
              {tags.map((tag, index) => {
                if (editInputIndex === index) {
                  return (
                    <Input
                      ref={editInputRef}
                      key={tag}
                      size="small"
                      style={tagInputStyle}
                      value={editInputValue}
                      onChange={handleEditInputChange}
                      onBlur={handleEditInputConfirm}
                      onPressEnter={handleEditInputConfirm}
                      disabled={loading}
                    />
                  );
                }
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    key={tag}
                    closable={!loading}
                    className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200 rounded-full font-medium"
                    style={{
                      userSelect: "none",
                      borderRadius: '9999px',
                      marginBottom: '8px',
                    }}
                    onClose={() => handleClose(tag)}
                  >
                    <span
                      onDoubleClick={(e) => {
                        if (index !== 0 && !loading) {
                          setEditInputIndex(index);
                          setEditInputValue(tag);
                          e.preventDefault();
                        }
                      }}
                    >
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={tagInputStyle}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                  disabled={loading}
                />
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1 border-2 border-dashed border-gray-300 rounded-full text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all duration-300 disabled:opacity-50"
                  onClick={showInput}
                  disabled={loading}
                >
                  <PlusOutlined className="mr-1" />
                  Nueva etiqueta
                </button>
              )}
            </Flex>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="loading-spinner w-5 h-5"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
            <span>{loading ? 'Procesando...' : (taskToEdit ? "Actualizar Tarea" : "Crear Tarea")}</span>
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}
